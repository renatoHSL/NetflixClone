import { NextApiRequest, NextApiResponse } from "next";
import { without } from 'lodash';

import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // TODO problema na hora de guardar os favoritos
        // Erro de "not sign in no console"
        if (req.method === 'POST') {
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid ID');
            }

            const user = await prismadb.user.update({
                where: {
                    email: currentUser.email || ''
                },
                data: {
                    favoriteIds: {
                        push: movieId,
                    }
                }
            });

            return res.status(200).json(user);
        }

        if (req.method === 'DELETE') {
            const { currentUser } = await serverAuth(req);

            const { movieId } = req.body;

            const existingMovie = await prismadb.movie.findUnique({
                where: {
                    id: movieId,
                }
            });

            if (!existingMovie) {
                throw new Error('Invalid id')
            }

            const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

            const updateUser = await prismadb.user.update({
                where: {
                    email: currentUser.email || '',
                },
                data: {
                    favoriteIds: updatedFavoriteIds,
                }
            });

            return res.status(200).json(updateUser);
        }

        return res.status(405).end();
    } catch (error) {
        console.log(error);
        console.log('error aqui');
        return res.status(400).end();
    }
}