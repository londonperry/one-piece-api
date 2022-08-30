import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../utils/prisma";

const handler = async(req: NextApiRequest, res: NextApiResponse) => {
    if ( req.method !== 'GET'){
        return res.status(405);
    }

    const id = req.query.id;
    const idStr = Array.isArray(id) ? id[0] : id || '';
    const idNum = parseInt(idStr);

    if(isNaN(idNum)) {
        return res.status(400).json({
            error: 'Invalid id query parameter.',
        });
    }

    const character = await prisma.tog_character.findUnique({
        where: {
            id: idNum
        }
    });
    res.json(character);
}

export default handler;