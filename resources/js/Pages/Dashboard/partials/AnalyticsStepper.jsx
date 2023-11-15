import { Stepper, Step, Button } from "@material-tailwind/react";
import { useState } from "react";
 
export default function AnalyticsStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] =useState(false);
 
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
 
  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
        activeLineClassName="bg-green-600"
        lineClassName="bg-gray-800"
      >
        <Step onClick={() => setActiveStep(0)} className="bg-gray-800 text-white" activeClassName="bg-white text-black" completedClassName="bg-green-600 text-black">1</Step>
        <Step onClick={() => setActiveStep(1)} className="bg-gray-800 text-white" activeClassName="bg-white text-black" completedClassName="bg-green-600 text-black">2</Step>
        <Step onClick={() => setActiveStep(2)} className="bg-gray-800 text-white" activeClassName="bg-green-600 text-black" completedClassName="bg-green-600 text-black">3</Step>
      </Stepper>
    </div>
  );
}