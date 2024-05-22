export const getHintLabel = (status: string) => {
  switch (status) {
    case "P":
      return "Prepare information";
    case "R":
      return "Ready for blockchain";
    case "E":
      return "Edit information";
    case "I":
      return "Successfully to blockchain";
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
      return "w-60 py-6 mt-2 text-white bg-red-500 hover:bg-white hover:text-red-500 hover:border-red-500";
    case "R":
      return "w-60 py-6 mt-2 text-white bg-yellow-500 hover:bg-white hover:text-yellow-500 hover:border-yellow-500";
    case "E":
      return "w-60 py-6 mt-2 text-white bg-orange-500 hover:bg-white hover:text-orange-500 hover:border-orange-500";
    case "I":
      return "w-60 py-6 mt-2 text-white bg-green-500 hover:bg-white hover:text-green-500 hover:border-green-500";
    default:
      return "w-60 py-6 mt-2 text-white bg-gray-500 hover:bg-white hover:text-gray-500 hover:border-gray-500";
  }
};
