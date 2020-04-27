import { v4 as uuidv4 } from 'uuid';

function uniqueId(): string {
    return uuidv4();
}

export { uniqueId };
