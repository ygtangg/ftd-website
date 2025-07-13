import { createClient } from "@/lib/supabase/client";
import HomeClient from './HomeClient'

export default async function Home() {
    const supabase = createClient();
    const { data: events, error } = await supabase
        .from('event')
        .select('id, event_name, event_datetime, event_location')
        // .gt('event_datetime', new Date().toISOString())
        .order('event_datetime', { ascending: true })
        .limit(3);
        
    if (error) {
        console.error('Error fetching events:', error);
        return;
    }
    
    return <HomeClient events={events || []} />
}