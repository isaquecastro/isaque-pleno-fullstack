import { XMarkIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";
import FriendItem from "./components/FriendItem";

const Friends = () => {
  const [data, setData] = useState([]);

  const { checkSession, token, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [searchDone, setSearchDone] = useState(false);

  useEffect(() => {
    async function load() {
      if (!searchDone && checkSession) {
        try {
          setIsLoading(true);
          const response = await api.get("/friends");

          if (response.data) {
            setData(response.data);
            setIsLoading(false);
          } else {
            setIsLoading(true);
          }
          setSearchDone(true);
        } catch (err) {
          if (err) {
            setIsLoading(true);
            setSearchDone(true);
          }
        }
      }
    }

    load();
  }, [checkSession, searchDone]);

  return (
    <div style={{ display: checkSession && token ? "block": "none" }} className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Amigos
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              Listando {data.length} amigo(s)
            </div>
          </div>
        </div>
        <div className="mt-5 flex lg:mt-0 lg:ml-4">
          <span className="sm:ml-3">
            <button
              onClick={() => logout()}
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <XMarkIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Sair
            </button>
          </span>
        </div>
      </div>

      <div style={{ marginTop: 30 }} className="flex flex-wrap">
        {isLoading ? (
          <TailSpin
            height="80"
            width="80"
            color="#ddd"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <>
            {data.length === 0 ? (
              <p>Nenhum resultado disponível</p>
            ) : (
              data.map((item: any) => (
                <FriendItem
                  name={item.name}
                  email={item.email}
                  lat={item.address.geo.lat}
                  lng={item.address.geo.lng}
                  phone={item.phone}
                  username={item.username}
                  website={item.website}
                  company={item.company.name}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Friends);
