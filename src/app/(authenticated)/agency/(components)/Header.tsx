'use client';

import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, Button } from "@nextui-org/react";
// import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { BellIcon} from "@radix-ui/react-icons";

function Header({session}) {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <Logo />
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <div>
                    <p>Chào mừng đến với kênh đối tác</p>
                </div>
            </NavbarContent>
            <NavbarContent as="div" justify="end">
                <Button isIconOnly aria-label="Like" radius="full">
                    <BellIcon />
                </Button>
                {/* <Button variant="outline" size="icon" >
                    <BellIcon className="h-4 w-4" />
                </Button> */}
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name={session?.user?.name}
                            size="sm"
                            src={session?.user?.avatar}
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">Signed in as</p>
                            <p className="font-semibold">{session?.user?.name}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">My Settings</DropdownItem>
                        <DropdownItem key="team_settings">Team Settings</DropdownItem>
                        <DropdownItem key="analytics">Analytics</DropdownItem>
                        <DropdownItem key="system">System</DropdownItem>
                        <DropdownItem key="configurations">Configurations</DropdownItem>
                        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            Log Out
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    );
}

export default Header;