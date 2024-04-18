import jsPDF from "jspdf";

export const appendChildren = (data, nodeName, children) => {
  return data.map((item) => {
    if (item.name === nodeName) {
      return {
        ...item,
        children: item.children
          ? [...item.children, ...children]
          : [...children],
      };
    } else if (item.children) {
      return {
        ...item,
        children: appendChildren(item.children, nodeName, children),
      };
    }
    return item;
  });
};

export const downloadRoadmap = (roadmap) => {
  const doc = new jsPDF();

  const generateList = (items, depth: number, startY: number) => {
    let y = startY;
    items.forEach((item, index) => {
      const prefix = `${index + 1}.`;
      const indentation = "  ".repeat(depth);
      const text = `${indentation}${prefix} ${item.name}`;

      doc.text(text, 10, y);
      y += 7; // Increase vertical spacing

      if (y >= doc.internal.pageSize.height - 10) {
        doc.addPage();
        y = 10;
      }

      if (item.children) {
        y = generateList(item.children, depth + 1, y);
      }
    });
    return y; // Return updated y position
  };

  generateList(roadmap, 0, 10);

  doc.save("roadmap.pdf");
};

export const updateNodeCompletion = (data, nodeName, isCompleted) => {
  return data.map((item) => {
    if (item.name === nodeName) {
      return { ...item, isCompleted };
    } else if (item.children) {
      const updatedChildren = updateNodeCompletion(
        item.children,
        nodeName,
        isCompleted
      );
      const allCompleted = updatedChildren.every((child) => child.isCompleted);
      return {
        ...item,
        children: updatedChildren,
        isCompleted: allCompleted,
      };
    }
    return item;
  });
};



export const orientationOptions = [
  { label: "Vertical", value: "vertical" },
  { label: "Horizontal", value: "horizontal" },
];

export const pathFuncOptions = [
  { label: "Step", value: "step" },
  // { label: "Straight", value: "straight" },
  { label: "Curved", value: "curved" },
];

export const calculateCompletionPercentage = (nodes) => {
  if (!nodes || nodes.length === 0) return 0; // Handle empty or undefined input

  let totalNodes = 0;
  let completedNodes = 0;

  const traverseNodes = (node) => {
    if (!node) return 0; // Treat undefined or null nodes as not completed for safety

    totalNodes++; // Count this node

    let childrenCompleted = 0;
    let childrenCount = 0;

    if (node.children && node.children.length > 0) {
      // Traverse children and count completed nodes
      for (const child of node.children) {
        childrenCount++;
        childrenCompleted += traverseNodes(child);
      }
    }

    // Check if all children are completed and the node itself is marked completed
    if (childrenCompleted === childrenCount && node.isCompleted) {
      completedNodes++;
      return 1; // Return 1 to indicate this node and its children are completed
    }

    return 0; // Return 0 to indicate this node or its children are not completed
  };

  // Start traversal from each top-level node
  nodes.forEach(traverseNodes);

  // Calculate completion percentage
  const percentage = totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;
  return Math.round(percentage * 100) / 100; // Round to two decimal places for readability
};


export const completionMessage = (completionPercent) => {
  if (completionPercent >= 100) {
    return "Congratulations! You have completed your roadmap.";
  } else if (completionPercent > 75) {
    return "Almost there! Keep pushing to finish your goals.";
  } else if (completionPercent > 50) {
    return "You're halfway there!";
  } 
  else if(completionPercent === 0){
    return "Get start!"
  }else {
    return "Great start! Let's keep making progress.";
  }
};


export const getProgressColorClass = (percent) => {
  if (percent >= 90) {
    return "#4CAF50"; // Softer green, similar to Material Design's Green 500
  } else if (percent >= 50) {
    return "#FFEB3B"; // Muted yellow, similar to Material Design's Yellow 500
  } else {
    return "#FF5722"; // Soft red, similar to Material Design's Deep Orange 500
  }
};

