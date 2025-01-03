import {replaceInFileSync} from 'replace-in-file';

const apiUrl = process.argv[2];
console.log(apiUrl)
const options = {
    files: 'src/environments/environment.ts', from: /{API_URL}/g, to: apiUrl, allowEmptyPaths: false,
};

try {
    replaceInFileSync(options);
} catch (error) {
    console.error('Error occurred:', error);
}