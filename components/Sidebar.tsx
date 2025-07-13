import { createClient } from '@/lib/supabase/server';
import SidebarClient from './SidebarClient'
import { jwtDecode } from 'jwt-decode'

export default async function Sidebar() {
    const supabase = await createClient();
    const { data: sessionData } = await supabase.auth.getSession();
    
    var role = null;
    if (sessionData.session) {
        type DancerJwtPayload = {
            dancer_role: string
            [key: string]: any
        }
        const jwt = jwtDecode<DancerJwtPayload>(sessionData.session.access_token)
        role = jwt.dancer_role
    }

  return <SidebarClient role={role} />
}

