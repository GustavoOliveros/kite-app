import {
    Card,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
   
  export function StatsCard(title) {
    return (
      <Card className="mt-6 w-96 rounded-lg bg-gray-800">
        <CardBody>
          <Typography variant="h2" color="white" className="mb-2 text-2xl">
            {title.title}
          </Typography>
          <Typography className="text-5xl" color="white">
            {title.number}
          </Typography>
        </CardBody>
      </Card>
    );
  }