export const getUserByEmail = async (email: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/emails/${email}`,
      {
        method: "GET",
      }
    );

    if (response.status === 200) {
      return response.json();
    }

    return null;
  } catch {
    return null;
  }
};

export const getUserByToken = async (token: string, role: string) => {
  try {
    let URL;
    if (role === "admin") {
      URL = "admins";
    } else if (role === "issuer") {
      URL = "issuers";
    } else {
      URL = "user";
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_DIAS}/${URL}/me`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.BACKEND_API}/users/${id}`, {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   // authorization: `Bearer ${token}`,
      // },
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};
