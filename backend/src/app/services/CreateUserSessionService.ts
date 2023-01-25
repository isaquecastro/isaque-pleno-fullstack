import jwt from "jsonwebtoken";
export default async (email: string, password: string) => {
  try {
    // Aqui haveria uma verificação sobre a existência do usuário

    const user = {
      email: email,
      name: email.split("@")[0],
    };

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // comparar senha enviada com a senha criptografada no banco

    //   if (!(await user.compareHash(password))) {
    //     throw new Error('Senha inválida');
    //   }

    const token = jwt.sign({ email }, process.env.APP_SECRET || "secret", {
      expiresIn: 86400 * 30,
    });

    return {
      user,
      token,
    };
  } catch (err) {
    return { message: "Falha na autenticação do usuário", error: err };
  }
};
