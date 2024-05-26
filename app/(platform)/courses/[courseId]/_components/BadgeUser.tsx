import { Badge } from "@/components/ui/badge";

type User = {
  certificateUUID?: string;
  certificateRevoked?: boolean;
};

type BadgeUserProps = {
  users: User[];
  status: string;
};

const BadgeUser = ({ users, status }: BadgeUserProps) => {
  if (!Array.isArray(users)) {
    console.error(users);
    return null;
  }

  const totalCerts = users.length;
  const noCertificateCount = users.filter(
    (user) => !user.certificateUUID && !user.certificateRevoked
  ).length;

  const validCertificateCount = users.filter(
    (user) => user.certificateUUID && !user.certificateRevoked
  ).length;

  const revokedCertificateCount = users.filter(
    (user) => user.certificateUUID && user.certificateRevoked
  ).length;

  return (
    <div className="flex space-x-4">
      <Badge className="bg-blue-500 text-white">Total : {totalCerts}</Badge>
      {status === "I" && (
        <>
          {/* <Badge className="bg-blue-500 text-white">Total : {totalCerts}</Badge> */}
          {noCertificateCount > 0 && (
            <Badge className="bg-yellow-500 text-white">
              Waiting : {noCertificateCount}
            </Badge>
          )}
          <Badge className="bg-orange-500 text-white">
            Revoked : {revokedCertificateCount}
          </Badge>
          <Badge className="bg-green-500 text-white">
            Verified : {validCertificateCount}
          </Badge>
        </>
      )}

      {status === "P" && (
        <>
          {/* <Badge className="bg-blue-500 text-white">Total : {totalCerts}</Badge> */}
          <Badge className="bg-red-500 text-white">
            Prepare : {noCertificateCount}
          </Badge>
        </>
      )}

      {status === "R" && (
        <>
          {/* <Badge className="bg-blue-500 text-white">Total : {totalCerts}</Badge> */}
          <Badge className="bg-yellow-500 text-white">
            Waiting : {noCertificateCount}
          </Badge>
        </>
      )}
    </div>
  );
};

export default BadgeUser;
