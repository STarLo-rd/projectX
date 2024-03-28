import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth-context.tsx";
import { getAuthorizationHeader } from "../../utils/utils.ts";
import AxiosInstance from "../../services/axios-instance.ts";
import plantumlEncoder from "plantuml-encoder";

const RoadMap: React.FC = () => {
  const { user } = useAuth();
  const [plantUmlText, setPlantUmlText] = useState("");

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await AxiosInstance.post(
          "/roadmap/generate",
          { interest: "web development" },
          {
            headers: getAuthorizationHeader(),
          }
        );
        // const res: string = response.data.text;
        // console.log(res);

        const res = response.data.text.trim(); // Remove leading/trailing whitespace
        const diagrams = res
          .split("```plantuml")
          .map((diagram) => diagram.trim()); // Trim each diagram
        const newDiagram = diagrams.join("\n");
        console.log("new Diagram", newDiagram);
        const diag2 = newDiagram.substring(0, newDiagram.length - 3);
        console.log("new Diagram2", diag2);

        const normalizedUml = diag2.replace(/\\n/g, "\n");
        console.log(normalizedUml);
        setPlantUmlText(normalizedUml);
      } catch (err) {
        console.error(err);
        // Handle errors appropriately
      }
    };

    fetchRoadmap();
  }, [user]);

  const encodedUml = plantumlEncoder.encode(plantUmlText || "");

  const url = `http://www.plantuml.com/plantuml/svg/${encodedUml}`;

  return (
    <>
      <h1>Hello world</h1>
      {plantUmlText && <img alt="PlantUML Diagram" src={url} />}
    </>
  );
};

export default RoadMap;

// const RoadMap: React.FC = () => {
//   const plantUmlText = `
//     @startuml
//     Class01 <|-- Class02
//     Class03 *-- Class04
//     Class05 o-- Class06
//     Class07 .. Class08
//     @enduml
//   `;

//   const encodedUml = plantumlEncoder.encode(plantUmlText);

//   const url = `http://www.plantuml.com/plantuml/svg/${encodedUml}`;

//   return (
//     <>
//       <h1>Hello world</h1>
//       <img alt="PlantUML Diagram" src={url} />
//     </>
//   );
// };

// export default RoadMap;
