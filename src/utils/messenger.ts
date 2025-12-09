import { Vehicle } from '../lib/supabase';
import { SELLER_MESSENGER_USERNAME } from '../config/contact';

/**
 * Generates a Facebook Messenger URL with pre-filled vehicle information
 * @param vehicle - The vehicle object to include in the message
 * @returns Facebook Messenger URL with encoded message
 */
export function generateMessengerUrl(vehicle: Vehicle): string {
  // Create a formatted message with vehicle details
  const message = `Hi! I'm interested in this vehicle:

🚗 ${vehicle.make} ${vehicle.model} (${vehicle.year})
💰 Price: ₱${vehicle.price.toLocaleString()}
📊 Mileage: ${vehicle.mileage}
⚙️ Transmission: ${vehicle.transmission}
⛽ Fuel Type: ${vehicle.fuel_type}
📦 Category: ${vehicle.category}

Could you please provide more information about this unit?`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);

  // Facebook Messenger URL format: https://m.me/{username}?text={message}
  return `https://m.me/${SELLER_MESSENGER_USERNAME}?text=${encodedMessage}`;
}

