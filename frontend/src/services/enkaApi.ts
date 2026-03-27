//esta es una funcion que trabaja con peticiones
export async function fetchPlayer(uid: string) {

    const response = await fetch(`http://localhost:3000/api/player/${uid}`);

    if (!response.ok) {
        throw new Error("Player Not Found");
    }
    //Convierte la respuesta a json
    return response.json();
}