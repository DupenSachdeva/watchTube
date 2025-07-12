import { FileText, Settings, Upload } from "lucide-react";

export interface ChildProps {
  currentStep: string;
  setCurrentStep : React.Dispatch<React.SetStateAction<string>>
}
const ShowUpload: React.FC<ChildProps> = ({ currentStep , setCurrentStep }) =>{
    
    return <>
       
       <div className="mb-8 text-center">
               <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                 ColorTube Studio
               </h1>
               <p className="text-gray-600">Create and share amazing content with the world</p>
             </div>
       
             {/* Progress Steps */}
             <div className="mb-8">
               <div className="flex items-center justify-center space-x-8">
                 {[
                   { key: "upload", label: "Upload", icon: Upload },
                   { key: "details", label: "Details", icon: FileText },
                   { key: "settings", label: "Settings", icon: Settings },
                 ].map(({ key, label, icon: Icon }, index) => (
                   <div key={key} className="flex items-center">
                     <div
                       className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                         currentStep === key
                           ? "bg-purple-600 border-purple-600 text-white"
                           : index < ["upload", "details", "settings"].indexOf(currentStep)
                             ? "bg-green-500 border-green-500 text-white"
                             : "border-gray-300 text-gray-400"
                       }`}
                     >
                       <Icon className="w-5 h-5" />
                     </div>
                     <span className={`ml-2 font-medium ${currentStep === key ? "text-purple-600" : "text-gray-500"}`}>
                       {label}
                     </span>
                     {index < 2 && <div className="w-16 h-0.5 bg-gray-300 ml-4" />}
                   </div>
                 ))}
               </div>
             </div>
    
    </>
}

export default ShowUpload