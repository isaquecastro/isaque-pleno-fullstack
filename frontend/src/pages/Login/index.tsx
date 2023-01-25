import { ClockIcon, LockClosedIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";

import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/auth";

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      setIsLoading(true);

      try {
        const response = await signIn(data.email, data.password);

        if (response && response.token) {
          toast.success("Autenticado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setTimeout(() => {
            navigate("/amigos");
          }, 300);
        } else {
          toast.error("Não foi possível realizar o login, tente novamente!", {
            position: "top-right",
            autoClose: 5000,
            style: { backgroundColor: "#ff2424" },
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err: any) {
        if (err.response.status === 401) {
          toast.error("Não foi possível realizar o login, tente novamente!", {
            position: "top-right",
            autoClose: 5000,
            style: { backgroundColor: "#ff2424" },
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    } catch (err) {
      setIsLoading(false);
      if (err) {
        toast.error("Erro ao fazer login");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Login
            </h2>
          </div>
          <Form
            className="mt-8 space-y-6"
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email
                </label>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ex.: joao@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            <div>
              <button
                disabled={isLoading}
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <ClockIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Carregando...
                  </>
                ) : (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Entrar
                  </>
                )}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
