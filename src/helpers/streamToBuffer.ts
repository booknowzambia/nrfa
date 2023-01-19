import * as Sentry from '@sentry/node'
// if Node version < 17.5.0, fetch api is not available natively
// this function works with the node-fetch package in those scenarios
// export function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
//     const chunks: Array<Buffer> = [];
//     return new Promise((resolve, reject) => {
//       stream.on('data', (chunk: any) => chunks.push(Buffer.from(chunk)));
//     //   stream.on('data', (chunk: any) => chunks.push(chunk));
//       stream.on('error', (err: any) => reject(err));
//       stream.on('end', () => resolve(Buffer.concat(chunks)));//.toString('utf-8')));//'base64')));
//     })
// }

export async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const chunks: Array<Buffer> = [];
    let reader = stream.getReader();
    try{
        while(true){
            let result = await reader.read();
            // console.log('CHUNK: ', result);
            if (result.done) {
                // console.log('DONE');
                break;
            }
            chunks.push(Buffer.from(result.value));
        }
    }
    catch(e){
        Sentry.captureException(e)
        console.log('ERROR WHILE READING: ', e);
        return Buffer.concat(chunks);
    }
    return Buffer.concat(chunks);
}