import { join } from 'path';
import { readFileSync } from 'fs';
import { apiPath } from './helper/helper';

export async function GET(req) {
    try {
        const filePath = join(apiPath, 'lib', 'data.json');
        const fileContent = readFileSync(filePath, 'utf-8');

        const data = {
            status: true,
            message: 'Successful!',
            data: JSON.parse(fileContent),
            error: null
        }
        return Response.json(data);
    } catch(error) {
        console.error(`Something went wrong when try to readFile - ${error?.message}`);

        return Response.json({
            status: false,
            message: "Server error! Try again later.",
            data: null,
            error: { message: "Server error" }
        });
    }
}