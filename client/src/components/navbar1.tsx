import {Book, Menu, Sunset, Trees, User, Zap} from "lucide-react";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent, SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import {useStore} from '@/store.ts'
import {Link} from 'react-router'
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.tsx'

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar1 = (
    {
        logo = {
            url: "/",
            src: "https://cdn-icons-png.flaticon.com/512/6456/6456651.png",
            alt: "Shoe",
            title: "Shoes Shop",
        },
        menu = [
            {title: "Home", url: "#"},
            {
                title: "Products",
                url: "#",
                items: [
                    {
                        title: "Blog",
                        description: "The latest industry news, updates, and info",
                        icon: <Book className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Company",
                        description: "Our mission is to innovate and empower the world",
                        icon: <Trees className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Careers",
                        description: "Browse job listing and discover our workspace",
                        icon: <Sunset className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Support",
                        description:
                            "Get in touch with our support team or visit our community forums",
                        icon: <Zap className="size-5 shrink-0"/>,
                        url: "#",
                    },
                ],
            },
            {
                title: "Resources",
                url: "#",
                items: [
                    {
                        title: "Help Center",
                        description: "Get all the answers you need right here",
                        icon: <Zap className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Contact Us",
                        description: "We are here to help you with any questions you have",
                        icon: <Sunset className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Status",
                        description: "Check the current status of our services and APIs",
                        icon: <Trees className="size-5 shrink-0"/>,
                        url: "#",
                    },
                    {
                        title: "Terms of Service",
                        description: "Our terms and conditions for using our services",
                        icon: <Book className="size-5 shrink-0"/>,
                        url: "#",
                    },
                ],
            },
            {
                title: "Pricing",
                url: "#",
            },
            {
                title: "Blog",
                url: "#",
            },
        ],
    }: Navbar1Props) => {
    const user = useStore(state => state.user)
    const logout = useStore(state => state.logout)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <section className="py-4">
            <div className="container m-auto">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-6">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8" alt={logo.alt}/>
                            <span className="text-lg font-semibold tracking-tighter">
                                {logo.title}
                            </span>
                        </a>
                        <div className="flex items-center">
                            <NavigationMenu>
                                <NavigationMenuList>
                                    {menu.map((item) => renderMenuItem(item))}
                                </NavigationMenuList>
                            </NavigationMenu>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {!!user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button variant={'outline'} size="sm">
                                        <User /> {user?.name}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Button asChild variant="outline" size="sm">
                                    <Link to={'/login'}>Login</Link>
                                </Button>
                                <Button asChild size="sm">
                                    <Link to={'/register'}>Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between px-4">
                        {/* Logo */}
                        <a href={logo.url} className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8" alt={logo.alt}/>
                        </a>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="size-4"/>
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                {!!user && (
                                    <SheetHeader className="flex flex-row items-center gap-2 p-4">
                                        <User className={'m-0'}/>
                                        <div>{user?.name}</div>
                                    </SheetHeader>
                                )}
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >
                                        {menu.map((item) => renderMobileMenuItem(item))}
                                    </Accordion>


                                    <div className="flex flex-col gap-3">
                                        {!!user ? (
                                            <Button onClick={handleLogout}>
                                                Logout
                                            </Button>
                                        ) : (
                                            <>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link to={'/login'}>Login</Link>
                                                </Button>
                                                <Button asChild size="sm">
                                                    <Link to={'/register'}>Sign Up</Link>
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};

const renderMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger className={'text-sm'}>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-80 bg-popover text-popover-foreground">
                    {item.items.map((subItem) => (
                        <NavigationMenuLink asChild key={subItem.title} className="w-80">
                            <SubMenuLink item={subItem}/>
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuContent>
            </NavigationMenuItem>
        );
    }

    return (
        <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
                href={item.url}
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
            >
                {item.title}
            </NavigationMenuLink>
        </NavigationMenuItem>
    );
};

const renderMobileMenuItem = (item: MenuItem) => {
    if (item.items) {
        return (
            <AccordionItem key={item.title} value={item.title} className="border-b-0">
                <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                    {item.title}
                </AccordionTrigger>
                <AccordionContent className="mt-2">
                    {item.items.map((subItem) => (
                        <SubMenuLink key={subItem.title} item={subItem}/>
                    ))}
                </AccordionContent>
            </AccordionItem>
        );
    }

    return (
        <a key={item.title} href={item.url} className="text-md font-semibold">
            {item.title}
        </a>
    );
};

const SubMenuLink = ({item}: { item: MenuItem }) => {
    return (
        <a
            className="flex flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
            href={item.url}
        >
            <div className="text-foreground">{item.icon}</div>
            <div>
                <div className="text-sm font-semibold">{item.title}</div>
                {item.description && (
                    <p className="text-sm leading-snug text-muted-foreground">
                        {item.description}
                    </p>
                )}
            </div>
        </a>
    );
};

export {Navbar1};
