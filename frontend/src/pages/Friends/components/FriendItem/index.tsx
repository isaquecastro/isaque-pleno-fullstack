interface FriendData {
  name: string;
  username: string;
  email: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  company: string;
}

const FriendItem: React.FC<FriendData> = (data) => {
  return (
    <div
      style={{ margin: 5 }}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{data.name}</div>
        <p className="text-gray-700 text-base">
          Username: {data.username}
          <br />
          Número: {data.phone}
          <br />
          Empresa: {data.company}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <a
          href={`http://maps.google.com/maps?q=${data.lat},${data.lng}`}
          rel="noreferrer"
          target="_blank"
          className="inline-block bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
        >
          Ver Localização
        </a>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {data.email}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {data.website}
        </span>
      </div>
    </div>
  );
};

export default FriendItem;
