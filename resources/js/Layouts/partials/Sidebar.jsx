import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    UserIcon,
    FilmIcon,
    ArrowLeftIcon
  } from "@heroicons/react/24/solid";
import ApplicationLogo from "@/Components/ApplicationLogo";
   
  export default function Sidebar() {
    return (
      <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-lg bg-gray-800 text-white">
        <div className="mb-2 p-4">
          <ApplicationLogo className="h-8 w-8 inline me-2"/>
        </div>
        <List>
          <ListItem className="hover:bg-gray-900">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
          <ListItem className="hover:bg-gray-900">
            <ListItemPrefix>
              <UserIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Usuarios
          </ListItem>
          <ListItem className="hover:bg-gray-900">
            <ListItemPrefix>
              <FilmIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Títulos
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem className="hover:bg-gray-900">
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Perfil
          </ListItem>
          <ListItem className="hover:bg-gray-900">
            <ListItemPrefix>
              <ArrowLeftIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Volver a la aplicación
          </ListItem>
          <ListItem className="hover:bg-gray-900 text-red-400">
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 pe-2" />
            </ListItemPrefix>
            Cerrar sesión
          </ListItem>
        </List>
      </Card>
    );
  }