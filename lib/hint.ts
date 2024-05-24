export const getHintLabel = (status: string) => {
  switch (status) {
    case "P":
      return "Prepare information";
    case "R":
      return "Ready for blockchain";
    case "E":
      return "Edit information";
    case "I":
      return "Successfully on blockchain";
    default:
      return "Unknown Status";
  }
};

export const getColorClass = (status: string) => {
  switch (status) {
    case "P":
      return "text-red-500"; // default
    case "R":
      return "text-yellow-500"; // ready
    case "E":
      return "text-orange-500"; // edit
    case "I":
      return "text-green-500"; // Go
    default:
      return "text-gray-700"; // Default color
  }
};

export const getColorBg = (status: string) => {
  switch (status) {
    case "P":
      return "bg-red-500 border-red-400";
    case "R":
      return "bg-yellow-500 border-yellow-400";
    case "E":
      return "bg-orange-500 border-orange-400";
    case "I":
      return "bg-green-500 border-green-400";
    default:
      return "bg-gray-700 border-gray-600";
  }
};

export const getBtnReadyBlock = (status: string) => {
  switch (status) {
    case "P":
      return "bg-red-500 hover:bg-white hover:text-red-500";
    case "R":
      return "bg-yellow-500 hover:bg-white hover:text-yellow-500";
    case "E":
      return "bg-orange-500 hover:bg-white hover:text-orange-500";
    case "I":
      return "bg-green-500 hover:bg-white hover:text-green-500";
    default:
      return "bg-gray-500 hover:bg-white hover:text-gray-500";
  }
};

export const getBtnReadyBlockHover = (status: string) => {
  switch (status) {
    case "P":
      return " hover:bg-white hover:text-red-500";
    case "R":
      return " hover:bg-white hover:text-yellow-500";
    case "E":
      return " hover:bg-white hover:text-orange-500";
    case "I":
      return " hover:bg-white hover:text-green-500";
    default:
      return " hover:bg-white hover:text-gray-500";
  }
};

export const getColorHeaderCourse = (status: string) => {
  switch (status) {
    case "P":
      return "bg-red-500";
    case "R":
      return "bg-yellow-500";
    case "E":
      return "bg-orange-500";
    case "I":
      return "bg-green-500";
    default:
      return "bg-gray-700";
  }
};

export const getTextColor = (status: string) => {
  switch (status) {
    case "P":
      return "text-red-500";
    case "R":
      return "text-yellow-500";
    case "E":
      return "text-orange-500";
    case "I":
      return "text-green-500";
    default:
      return "text-gray-700";
  }
};
