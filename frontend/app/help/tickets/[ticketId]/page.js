import { HelpPage } from '@/components/help-notifications';
export default async function Page({params}){const {ticketId}=await params;return <HelpPage page="help" ticketId={ticketId}/>}
