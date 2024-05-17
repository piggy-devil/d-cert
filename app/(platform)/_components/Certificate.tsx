import moment from "moment";
import "moment/locale/th";
import Image from "next/image";

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
          <div className="flex items-center justify-center">
            <Image src="/mwa-logo.png" alt="certlogo" width={96} height={96} />
          </div>

          <h1 className="text-5xl font-bold my-4">CERTIFICATE OF COMPLETION</h1>
          <span className="text-xl">This is to certify that</span>
          <p className="text-blue-600 text-5xl font-bold italic my-4 whitespace-nowrap ">
            {name}
          </p>
          <span className="text-lg">
            has successfully completed the course on
          </span>
          <h2 className="text-3xl font-semibold my-4">{course}</h2>
          <span className="text-xl">
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
            <div className="flex items-center justify-center">
              <Image
                className="font-bold"
                src="/signature.png"
                alt="certlogo"
                width={100}
                height={100}
              />
            </div>
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
