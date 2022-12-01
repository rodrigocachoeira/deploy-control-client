import {GetServerSideProps} from "next";
import { logout } from "../services/auth";

export default function Logout() {}

export const getServerSideProps: GetServerSideProps = async (context) => {
    logout(context);

    return {
        redirect: {
            destination: '/login',
			permanent: true,
		}
    };
}