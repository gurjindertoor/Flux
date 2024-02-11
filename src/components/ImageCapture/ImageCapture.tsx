// "use client";
// import React, { useState } from 'react';

// const CameraCapture: React.FC = () => {
//   const [image, setImage] = useState<string | null>(null);
//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files[0]) {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(files[0]);
//       fileReader.onload = (loadEvent) => {
//         const result = loadEvent.target?.result;
//         if (result) {
//           setImage(result.toString());
//         }
//       };
//     }
//   };

//   const triggerFileInput = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-start pt-16 h-screen"> {/* Increased base padding-top */}
//       <div className="w-full max-w-md px-4">
//         {!image ? (
//           <button onClick={triggerFileInput} className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700">
//             Take Image
//           </button>
//         ) : (
//           <button onClick={() => setImage(null)} className="w-full px-4 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-700">
//             Delete Image
//           </button>
//         )}
//       </div>
//       <div className="flex justify-center items-center w-full flex-1">
//         {image && (
//           <img src={image} alt="Captured" className="max-w-md max-h-full object-contain" />
//         )}
//       </div>
//       <input
//         type="file"
//         accept="image/*"
//         capture="environment" // Use "user" for front camera, "environment" for rear camera
//         onChange={handleCapture}
//         ref={fileInputRef}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default CameraCapture;

"use client";
import { sendCapture } from '@/lib/llm/llmClient';
import { CaptureImage, Vocabulaty } from '@/lib/llm/types';
import React, { useState } from 'react';
import LoadingSpinner from '../Utils/LoadingSpinner';

const CameraCapture: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [imageData, setImageData] = useState<{ src: string; name: string } | null>(null);
  const [response, setResponse] = useState<string>("");
  const [vocabs, setVocabs] = useState<any>(null);
  const [imageCapture, setImageCapture] = useState<CaptureImage | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const mimeType = file.type; // Get MIME type from the file
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (loadEvent) => {
        const result = loadEvent.target?.result;
        if (result) {
          setImageData({ src: result.toString(), name: file.name });
          // Construct the object to be logged
          const imageObject : CaptureImage = {
              mime: mimeType, // Use the MIME type obtained from the file
              data: result.toString().split(',')[1], // Extract only the Base64 encoded data part, excluding the data URL scheme
          };
          console.log(imageObject); // log image object
          setImageCapture(imageObject);
        }
      };
    }
  };
  
  

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-16 h-full w-full overflow-x-hidden">
      <div className="w-full max-w-md px-4">
        {!imageData ? (
          <button onClick={triggerFileInput} className="w-full px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700">
            Take Image
          </button>
        ) : (
          <div className='flex flex-col'>
            <button onClick={() => setImageData(null)} className="w-full px-4 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-700">
              Delete Image
            </button>
          </div>
          
        )}
      </div>
      <div className="flex justify-center items-center w-full flex-1">
        {imageData && (
          <>
            <img src={imageData.src} alt="Captured" className="max-w-md max-h-full object-contain" />
            {/* <p className="text-center mt-2">{imageData.name}</p> Display the file name and extension */}
          </>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        capture="environment" // Use "user" for front camera, "environment" for rear camera
        onChange={handleCapture}
        ref={fileInputRef}
        className="hidden"
      />

      <div>
      <div className="flex flex-row align-middle justify-around [&>button]:border-2 [&>button]:p-1 [&>button]:rounded-md [&>button]:m-1">
        <button 
          onClick={async () => {
            console.log(imageCapture)
            if(imageCapture) {
              try {
                setIsLoading(true);
                console.log("searching...")
                const res = await sendCapture(imageCapture, "spanish", "objects");
                const parsedRes = JSON.parse(res.split("```json")[1].split("```")[0]);
                console.log(parsedRes);
                setVocabs(parsedRes.vocab);
              } catch (e: any) {
                console.log(e);
                setResponse("Error generating vocabulary. Try again or choose another picture.");
              }
              setIsLoading(false);
            }
          }}>
            Objects
        </button>
        <button onClick={async () => {
          setIsLoading(true);
          if (imageCapture)
            setResponse(await sendCapture(imageCapture, "spanish", "story"));
          setIsLoading(false);
        }}>
          Story
        </button>
        <button onClick={async () => {
          setIsLoading(true);
          if (imageCapture)
            setResponse(await sendCapture(imageCapture, "spanish", "story"));
          setIsLoading(false);
        }}>
          Description
        </button>
      </div>
      <div className="flex flex-row justify-center p-3">
      {
        isLoading &&
        <LoadingSpinner />
      }
      </div>
      {vocabs &&
      <div className='flex flex-row w-full justify-center my-3'>
        <table className='border-2 [&_th]:border-2 [&_td]:border-2 [&_*]:p-1'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Translation</th>
            </tr>
          </thead>
          <tbody>
            {vocabs?.map((vocab: Vocabulaty, idx: number) => (
              <tr key={idx}>
                <td>{vocab.name}</td>
                <td>{vocab.translation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      }
      <p>
        {response}
      </p>
    </div>

  </div>
    
  );
};

export default CameraCapture;
