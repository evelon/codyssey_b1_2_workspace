import { createClient } from "@supabase/supabase-js";

import { supabaseKey, supabaseUrl } from "../config/env";
import type { Database } from "./database.types";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
