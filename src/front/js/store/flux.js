const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			register: async(formData) => {
				try{
					const resp = await fetch( 'https://verbose-meme-g45pqv9jwwrp2w444-3001.app.github.dev/api/register', { /*Backend Url*/
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error ('Algo fue mal')
					const data = await resp.json()
					localStorage.setItem('token', data.token) /*Toke es nombre de la propiedad y data.token el valor*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch(error){
					console.log(error)
					return false
				}
			},
			login: async(formData) => {
				try{
					const resp = await fetch( 'https://verbose-meme-g45pqv9jwwrp2w444-3001.app.github.dev/api/login', { /*Backend Url*/
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
					if (!resp.ok) throw new Error ('Algo fue mal')
					const data = await resp.json()
					localStorage.setItem('token', data.token) /*Toke es nombre de la propiedad y data.token el valor*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch(error){
					console.log(error)
					return false
				}
			},


			checkUser: async () => {
				try {
					const resp = await fetch( 'https://verbose-meme-g45pqv9jwwrp2w444-3001.app.github.dev/api/protected', { /*Backend Url*/
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					})
					if (!resp.ok) throw new Error ('Algo fue mal')
					if (resp.status!==200) throw new Error ('Algo fue mal')
						
					const data = await resp.json()
					console.log(data)
					setStore({user: data.user}) /*Aquí recibimos la información del usuario*/
					return true /*Para la navegación y que cambie de página si estamos registrados*/
				} catch (error) {
					console.log(error)
					return false
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;