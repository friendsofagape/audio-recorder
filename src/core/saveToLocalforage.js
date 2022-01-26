import localforage from "localforage"

const saveToLocalforage = ({ verse, version, verseBatchNum, blobUrl  }) => {
    console.log("dsdsdsdds")
  const savetoLocal = [{
    [verse]: {
        [version]: [{[verseBatchNum]: blobUrl}],
    }
  }]
    localforage.getItem('verseData', function (err, value) {
        // if err is non-null, we got an error. otherwise, value is the value
        if(value === null){
          localforage.setItem('verseData', savetoLocal)
        }else{
                if(value){
                    (value).forEach((val) => {
                        Object.entries(val).forEach(([versenum, verseVal]) => {
                            if(versenum === verse){
                                console.log("same value")
                            } else{
                                console.log(`${versenum} ${verseVal}`);
                                if(versenum !== verse) {
                                    value.push({
                                        [verse]: {
                                            [version]: [{[verseBatchNum]: blobUrl}],
                                        }
                                    })
                                }
                            }
                            
                        })
                    });
                }
                localforage.setItem('verseData', value)
        }
    })
    
        
   
}
export default saveToLocalforage;