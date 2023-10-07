import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";
import { ProductList } from "./components/ProductList";
import { NewProduct } from "./components/NewProduct";
import { NewManager } from "./components/NewManager";
import { ImportList } from "./components/ImportList";
import { ImportHistory } from "./components/ImportHistory";
import { ExportHistory } from "./components/ExportHistory";
import { ExportList } from "./components/ExportList";
import { Import } from "./components/Import";
import { Export } from "./components/Export";

export const AdminHome = () => {
  const section = useParams();
  console.log("param:", section);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 m-32 mt-16 border-2 rounded-lg p-20 bg-white">
        {section.product === "products" && <ProductList />}
        {section.create === "create" && <NewProduct product={true} />}
        {section.register === "register" && <NewManager />}

        {section.product === "import" && <Import />}
        {section.product === "schedule-import" && <ImportList />}
        {section.history === "history" && <ImportHistory />}

        {section.product === "export" && <Export />}
        {section.product === "schedule-export" && <ExportList />}
        {section.exporthistory === "history" && <ExportHistory />}
      </div>
    </div>
  );
};
