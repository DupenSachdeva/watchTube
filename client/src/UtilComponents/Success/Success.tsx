import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X } from "lucide-react";
import React from "react";

interface SuccessMessageProps {
  message: string;
  setIsSuccess : React.Dispatch<React.SetStateAction<boolean>>;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message , setIsSuccess }) => {

 console.log("this has rendered");
 
  return (
    
    <div className="fixed top-0 md:top-4 left-40 md:left-2/4 z-50 p-4 w-96">

      <Alert variant="default" className="bg-green-100 border-green-300 flex items-center justify-between">
        <div className="flex items-center">
          <CheckCircle2 className="h-4 w-4 text-green-700" />
          <AlertDescription className="text-green-800 ml-2 font-medium">
            {message}
          </AlertDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 hover:bg-green-200"
          onClick={() => setIsSuccess(false)}
        >
          <X className="h-4 w-4 text-green-700" />
          <span className="sr-only">Close</span>
        </Button>
      </Alert>


    </div>
  );
};

export default SuccessMessage;
