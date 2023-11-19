import { Stepper, Step } from "@material-tailwind/react";
 
export default function AnalyticsStepper({activeStep}) {

 
  return (
    <div className="w-full py-4 px-8">
      <Stepper
        activeStep={activeStep}
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