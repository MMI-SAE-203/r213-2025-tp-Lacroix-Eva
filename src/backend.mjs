import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090/');

export async function getOffres() {
    try {
        let data = await pb.collection('Agence').getFullList({
            sort: '-created',
        });
        data = data.map((a) => {
            a.img= pb.files.getURL(a, a.images);
            return a;
        });
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}