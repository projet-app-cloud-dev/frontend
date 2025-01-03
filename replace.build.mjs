import {replaceInFileSync} from 'replace-in-file';

const apiUrl = process.argv[2];
const appInsight = process.argv[3];
let options = {
    files: 'src/environments/environment.ts', from: /{API_URL}/g, to: apiUrl, allowEmptyPaths: false,
};

try {
    replaceInFileSync(options);
} catch (error) {
    console.error('Error occurred:', error);
}

options = {
    files: 'src/environments/environment.ts', from: /{APP_INSIGHT}/g, to: appInsight, allowEmptyPaths: false,
};
try {
    replaceInFileSync(options);
} catch (error) {
    console.error('Error occurred:', error);
}