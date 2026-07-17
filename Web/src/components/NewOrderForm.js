import React, { useState } from "react";
import FormField from "./ui/FormField";
import Select from "./ui/Select";
import SegmentedControl from "./ui/SegmentedControl";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import Alert from "./ui/Alert";
import { createOrder, SERVICE_TYPES } from "../api/ordersApi";
import styles from "./NewOrderForm.module.css";

const PRICE_BY_SERVICE = Object.fromEntries(
  SERVICE_TYPES.map((s) => [s.value, s.label.split("\u20b1")[1]])
);

function todayIso() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

/**
 * The actual "New Order" workflow — this is the piece that makes the
 * dashboard's "Start a new order" button, and the Orders page, real
 * instead of disabled placeholders. Price is shown for reference only;
 * the backend recalculates it server-side rather than trusting this form.
 */
function NewOrderForm({ onCreated, onCancel }) {
  const [serviceType, setServiceType] = useState(SERVICE_TYPES[0].value);
  const [pickupType, setPickupType] = useState("PICKUP");
  const [pickupDate, setPickupDate] = useState(todayIso());
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const order = await createOrder({
        serviceType,
        pickupType,
        pickupDate,
        notes,
      });
      onCreated(order);
    } catch (err) {
      setError(err.message || "Couldn't create your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField label="Service type" htmlFor="order-service">
        <Select id="order-service" value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
          {SERVICE_TYPES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Pickup or drop-off" htmlFor="order-pickup-type">
        <SegmentedControl
          name="pickupType"
          value={pickupType}
          onChange={setPickupType}
          options={[
            { value: "PICKUP", label: "Rider pickup" },
            { value: "DROPOFF", label: "I'll drop off" },
          ]}
        />
      </FormField>

      <FormField label="Preferred date" htmlFor="order-date">
        <input
          id="order-date"
          type="date"
          className={styles.dateInput}
          min={todayIso()}
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
          required
        />
      </FormField>

      <FormField label="Special instructions (optional)" htmlFor="order-notes">
        <Textarea
          id="order-notes"
          placeholder="e.g. Separate the white shirt, extra fabric softener..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </FormField>

      <div className={styles.priceRow}>
        <span>Estimated price</span>
        <span className={styles.priceValue}>{"\u20b1" + (PRICE_BY_SERVICE[serviceType] || "")}</span>
      </div>

      {error && (
        <div className={styles.errorWrap}>
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {isSubmitting ? "Placing order..." : "Place order"}
        </Button>
      </div>
    </form>
  );
}

export default NewOrderForm;
