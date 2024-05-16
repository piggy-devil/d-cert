import moment from "moment";
import "moment/locale/th";

type CertificateProps = {
  name?: string;
  course?: string;
  dateOfStudyStart?: string;
  dateOfStudyEnd?: string;
  signature?: {
    preview: string;
  };
  signatureDetails?: string;
};

export const Certificate = ({
  name,
  course,
  dateOfStudyStart,
  dateOfStudyEnd,
  signature,
  signatureDetails,
}: CertificateProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full text-black">
      <div className="bg-white p-8 w-[1122px] aspect-[3/2] text-center -translate-x-3">
        <div className="border-4 border-black p-8 flex flex-col h-full justify-between">
          <div>Logo Here</div>
          <h1 className="text-4xl font-bold my-4">
            CERTIFICATE OF APPRECIATION
          </h1>
          <span className="text-sm">
            This certificate is proudly awarded to
          </span>
          <p className="text-blue-600 text-6xl font-bold italic my-4 whitespace-nowrap ">
            {name}
          </p>
          <span className="text-sm">
            for successfully completing the course
          </span>
          <h2 className="text-2xl font-semibold my-4">{course}</h2>
          <span className="text-sm">
            {`${
              dateOfStudyStart
                ? moment(dateOfStudyStart).locale("th").format("D MMMM")
                : "-"
            } ${
              dateOfStudyStart
                ? moment(dateOfStudyStart).add(543, "years").format("YYYY")
                : "-"
            }
            - ${
              dateOfStudyEnd
                ? moment(dateOfStudyEnd).locale("th").format("D MMMM")
                : "-"
            } ${
              dateOfStudyStart
                ? moment(dateOfStudyStart).add(543, "years").format("YYYY")
                : "-"
            }`}
          </span>
          <div className="mt-12 inline-block">
            {/* <img className="h-24 w-36 mb-2" src={signature.preview} alt="Signature" /> */}
            <span className="block h-px w-48 bg-black mx-auto mb-2"></span>
            <span className="text-sm">{signatureDetails}</span>
          </div>
        </div>
      </div>
      {/* <button className="border-2 border-black w-full bg-gray-200 p-4 text-lg mt-12 hover:bg-black hover:text-white transition-all duration-300">
        Download PDF
      </button> */}
    </div>
  );
};
