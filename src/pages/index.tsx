import { Inter } from "@next/font/google";
import type { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage = () => <h1 className={inter.className}>Hello World</h1>;

export default Home;
