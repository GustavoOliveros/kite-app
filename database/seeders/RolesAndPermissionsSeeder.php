<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions - users
        Permission::create(['name' => 'access app']); // gives you access to the app
        Permission::create(['name' => 'suggest titles']); // allows you to suggest titles

        // create permissions - moderator
        Permission::create(['name' => 'access dashboard']); 
        Permission::create(['name' => 'see users']); // allows you to see the users table
        Permission::create(['name' => 'disable users']); // allows you to disable an user (can be enabled again)

        // create permissions - admin
        Permission::create(['name' => 'edit users']);
        Permission::create(['name' => 'see titles']); // allows you to see the titles table
        Permission::create(['name' => 'edit title']);
        Permission::create(['name' => 'disable titles']);

        // create roles and assign created permissions

        $role = Role::create(['name' => 'user'])
            ->givePermissionTo('access app', 'suggest titles');
        
        $role = Role::create(['name' => 'moderator'])
            ->givePermissionTo('access app', 'suggest titles','access dashboard',
                'see users', 'disable users');

        $role = Role::create(['name' => 'admin'])
            ->givePermissionTo(Permission::all());
    }
}