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

export async function getOffre(id) {
    try {
        let data = await pb.collection('Agence').getOne(id);
        data.imageUrl = pb.files.getURL(data, data.images);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}

export async function getOffresBySurface(s) {
    const maisonSurface = await pb.collection('Agence').getFullList({
        filter: `surface > ${s}`,
    });
    maisonSurface.forEach((maison) => {
        maison.img = pb.files.getURL(maison, maison.images);
    });
    return maisonSurface;
}

export async function getOffresByPrix(p) {
    const maisonPrix = await pb.collection('Agence').getFullList({
        filter: `prix > ${p}`,
    });
    maisonPrix.forEach((maison) => {
        maison.img = pb.files.getURL(maison, maison.images);
    });
    return maisonPrix;
}