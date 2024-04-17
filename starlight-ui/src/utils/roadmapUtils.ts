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
    if (!node) return false; // Treat undefined or null nodes as not completed

    totalNodes += 1; // Count this node

    let allChildrenCompleted = true;
    if (node.children && node.children.length > 0) {
      // Check if all children are completed
      allChildrenCompleted = node.children.every(traverseNodes);
    } else {
      // If there are no children, only consider this node completed if it is explicitly marked so
      allChildrenCompleted = !!node.isCompleted;
    }

    // Determine this node's completion based on its own status or its children's status
    if (node.isCompleted || allChildrenCompleted) {
      completedNodes += 1;
      return true;
    }

    return false;
  };

  // Process each root node
  nodes.forEach(traverseNodes);

  // Calculate completion percentage
  const percentage = (completedNodes / totalNodes) * 100;
  return Math.round(percentage * 100) / 100; // Round to two decimal places
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

