import { supabaseClient } from "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
export const load: PageLoad = async (event) => {
  const { session } = await getSupabase(event);
  if (!session) {
    throw redirect(303, "/");
  }

  const supabase = supabaseClient;
  const userId: string = session.user.id;

  const { data, error } = await supabase.storage
    .from("contracts")
    .list(`${userId}`, {
      limit: 100,
      offset: 0,
    });

  if (error) {
    console.log(error);
  }

  // console.log("PAGE LOAD...")

  const ip_api_result = await event.fetch("https://ipapi.co/json");
  const location = await ip_api_result.json();
  // console.log(location)

  const weather_url = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m&current_weather=true`;
  // console.log(weather_url)
  const weather_result = await event.fetch(weather_url);
  const weather = await weather_result.json();
  // console.log(weather)

  return {
    location: location,
    weather: weather,
    uploadedFiles: data ?? error,
  };
};
