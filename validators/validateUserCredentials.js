// libraries
import fs from "fs";
import { fileURLToPath } from 'url';
import path, {dirname} from 'path'

// logic for fileName and dirName
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const validateUser = (credentials) => {
    // logic for absolute path of file
    const filePath = path.join(__dirname, '..', 'users.json');
        
    // mock of DB
    const usersFromDB = fs.readFileSync(filePath, 'utf8');

    // check whether the username is valid
    return JSON.parse(usersFromDB).find(
      (user) => user.username === credentials.username
    );
        
}
