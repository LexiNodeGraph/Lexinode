import Image from "next/image";
import React, {useState} from "react";
import {RiArrowDropDownLine} from "react-icons/ri";

import {useUser} from "@auth0/nextjs-auth0";

import ItemsContainer from "./navbar/ItemsContainer";
import NavDropdown from "./navbar/NavDropdown";
import NavbarItem from "./navbar/NavbarItem";
import Logo from "./navbar/Logo";
import MobileNav from "./navbar/MobileNav";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useUser();

    const artigosItems = [
        {label: "Artigos", to: "/artigos", show: true},
        {label: "Favoritos", to: "/artigos/favoritos", show: true},
        {label: "Adicionar", to: "/adicionar", show: !user},
    ];

    const userItems = [
        {label: "Meu perfil", to: "/perfil", show: true},
        {label: "Sair", to: "/api/auth/logout", show: true, destaque: true},
    ];

    return (
        <nav className="bg-black drop-shadow p-2 relative z-10 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex w-full justify-between items-center">
                        <Logo />

                        <ItemsContainer>
                            {!user && <NavbarItem to="/artigos">Artigos</NavbarItem>}

                            {user && (
                                <NavDropdown user={user} items={artigosItems}>
                                    <RiArrowDropDownLine className="text-white text-2xl" />
                                    Artigos
                                </NavDropdown>
                            )}

                            <NavbarItem to="/autores">Autores</NavbarItem>

                            {!user && <NavbarItem to="/api/auth/login">Entrar</NavbarItem>}

                            {user?.email?.includes("ogabrielpereiraa7") && <NavbarItem to="/perfil/publicar">Adicionar artigo</NavbarItem>}

                            {user && (
                                <NavDropdown items={userItems}>
                                    <Image
                                        className="rounded-full"
                                        src={user.picture || "https://i.imgur.com/eRWRaqG.png"}
                                        alt={user.name || "NAO CARREGOU"}
                                        width="35"
                                        height="35"
                                    />
                                </NavDropdown>
                            )}
                        </ItemsContainer>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className=" outline-0 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} user={user} />
        </nav>
    );
};

export default Navbar;
