import { createClient } from "@/lib/supabase/server";
import AboutClient from './AboutClient'

export default async function About() {
    const supabase = await createClient();
    const { data: dancers, error } = await supabase
        .from('dancers')
        .select('*')
        .order('last_name', { ascending: true })

    if (error) {
        console.error('Error fetching dancers:', error);
        return;
    }

    const boardMem = dancers
        .filter(d => d.role !== 'member')
        .map(d => ({
            name: `${d.first_name} ${d.last_name}`,
            role: d.role,
            image: d.picture ? `/members/${d.picture}` : null,
            facts: d.facts,
            style: d.fav_dance_style,
        }))

    const generalMem = dancers
        .filter(d => d.role === 'member')
        .map(d => ({
            name: `${d.first_name} ${d.last_name}`,
            image: d.picture ? `/members/${d.picture}` : null,
            facts: d.facts,
            style: d.fav_dance_style,
        }))

    return <AboutClient boardMem={boardMem} generalMem={generalMem} />
}