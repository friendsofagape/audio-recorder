import Crunker from "crunker"

const concateTracks = async({
    inputSampleRate,
    audiofiles,
    bufferOption,
    filename
}) => {

        if (audiofiles.length) {
            const crunker	= new Crunker({ sampleRate: inputSampleRate })
            // As we aren't using `crunker.fetchAudio`, we must convert the files to buffers manually,
            // is the same code from the source, just condensed and without need to `fetch` the files.
            const buffers	= await Promise.all(Array.from(audiofiles).map(async file => crunker._context.decodeAudioData(await file.arrayBuffer())))
            const merged	= await crunker[bufferOption](buffers)
            const output	= await crunker.export(merged, "audio/mp3")
            // await crunker.download(output.blob, filename)
            return output.blob
        }
        
}
   
 
export default concateTracks;