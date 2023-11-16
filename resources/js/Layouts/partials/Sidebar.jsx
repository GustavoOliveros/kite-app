import {
    Card,
    List,
    ListItem,
    ListItemPrefix,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    UserCircleIcon,
    PowerIcon,
    UserIcon,
    FilmIcon,
    NewspaperIcon,
    PresentationChartLineIcon
  } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
   
  export default function Sidebar() {
    return (
      <Card className="w-full max-w-[20rem] fixed top-0 left-0 h-screen p-4 shadow-xl shadow-blue-gray-900/5 rounded-none bg-gray-800  hidden md:block">
        <div className="mb-2 p-4">
          <Link href={route('home')} value="test">
            <ApplicationLogo className="h-8 w-8 inline me-2"/>
          </Link>
        </div>
        <List>
          <Link href={route('dashboard')} className="">
              <ListItem className="hover:bg-gray-900 hover:text-white text-white">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5 pe-2" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
          </Link>
          <Link href={route('users')}>
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
              <ListItemPrefix>
                <UserIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Usuarios
            </ListItem>
          </Link>
          <Link href={route('titles')}>
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
              <ListItemPrefix>
                <FilmIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Títulos
            </ListItem>
          </Link>
          <Link href={route('changes.show')}>
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
              <ListItemPrefix>
                <NewspaperIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Cambios
            </ListItem>
          </Link>
          <Link href={route('analytics')}>
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
              <ListItemPrefix>
                <PresentationChartLineIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Generar Reporte
            </ListItem>
          </Link>
          <hr className="my-2 border-blue-gray-50" />
          <Link href={route('profile.edit')}>
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5 pe-2" />
              </ListItemPrefix>
              Perfil
            </ListItem>
          </Link>
          <Link method="post" href={route('logout')} as="button">
            <ListItem className="hover:bg-gray-900 hover:text-white text-white">
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