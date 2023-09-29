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
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
   
  export default function Sidebar() {
    return (
      <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 rounded-lg bg-gray-800 text-white">
        <div className="mb-2 p-4">
          <Link href={route('home')} value="test">
            <ApplicationLogo className="h-8 w-8 inline me-2"/>
          </Link>
        </div>
        <List>
          <Link href={route('dashboard')} className="">
              <ListItem className="hover:bg-gray-900">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5 pe-2" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
          </Link>
          <Link href={route('users')}>
            <ListItem className="hover:bg-gray-900">
              <ListItemPrefix>
                <UserIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Usuarios
            </ListItem>
          </Link>
          <Link href={route('titles')}>
            <ListItem className="hover:bg-gray-900">
              <ListItemPrefix>
                <FilmIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Títulos
            </ListItem>
          </Link>
          <hr className="my-2 border-blue-gray-50" />
          <Link href="/">
            <ListItem className="hover:bg-gray-900">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Perfil
            </ListItem>
          </Link>
          <Link method="post" href={route('logout')} as="button">
            <ListItem className="hover:bg-gray-900">
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Cerrar sesión
            </ListItem>
          </Link>
        </List>
      </Card>
    );
  }