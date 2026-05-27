import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GST_RATES = [5, 12, 18, 28];

const PRESETS = [
  { label: 'Groceries', rate: 5, icon: '🛒' },
  { label: 'Clothing', rate: 12, icon: '👕' },
  { label: 'Electronics', rate: 18, icon: '💻' },
  { label: 'Luxury', rate: 28, icon: '💎' },
];

function formatINR(val) {
  if (!val && val !== 0) return '₹0.00';
  return '₹' + val.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function ResultBox({ label, value, accent, muted }) {
  return (
    <View style={[
      styles.resultBox,
      accent && styles.resultBoxAccent,
      muted && styles.resultBoxMuted,
    ]}>
      <Text style={[styles.resultLabel, muted && styles.resultLabelMuted]}>{label}</Text>
      <Text style={[styles.resultValue, accent && styles.resultValueAccent, muted && styles.resultValueMuted]}>
        {value}
      </Text>
    </View>
  );
}

export default function GSTCalculatorScreen() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState('exclusive');
  const [qty, setQty] = useState('1');

  const numAmount = parseFloat(amount) || 0;
  const numQty = parseInt(qty) || 1;
  const base = numAmount * numQty;

  let taxableAmount, gstAmount, totalAmount, cgst, sgst;

  if (mode === 'exclusive') {
    taxableAmount = base;
    gstAmount = (base * rate) / 100;
    totalAmount = base + gstAmount;
  } else {
    totalAmount = base;
    taxableAmount = (base * 100) / (100 + rate);
    gstAmount = totalAmount - taxableAmount;
  }

  cgst = gstAmount / 2;
  sgst = gstAmount / 2;

  const handleAmountChange = useCallback((val) => {
    if (val === '' || /^\d*\.?\d*$/.test(val)) setAmount(val);
  }, []);

  const handleQtyChange = useCallback((val) => {
    if (val === '' || /^\d+$/.test(val)) setQty(val);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.subheading}>INDIA TAX TOOL</Text>
          <Text style={styles.title}>GST Calculator</Text>
          <View style={styles.titleUnderline} />
        </View>

        {/* Card */}
        <View style={styles.card}>

          {/* Mode Toggle */}
          <Text style={styles.sectionLabel}>CALCULATION MODE</Text>
          <View style={styles.modeRow}>
            {[
              { val: 'exclusive', label: 'Add GST', sub: 'Amount + Tax' },
              { val: 'inclusive', label: 'Extract GST', sub: 'Amount incl. Tax' },
            ].map(opt => (
              <TouchableOpacity
                key={opt.val}
                style={[styles.modeBtn, mode === opt.val && styles.modeBtnActive]}
                onPress={() => setMode(opt.val)}
                activeOpacity={0.7}
              >
                <Text style={[styles.modeBtnLabel, mode === opt.val && styles.modeBtnLabelActive]}>
                  {opt.label}
                </Text>
                <Text style={styles.modeBtnSub}>{opt.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Amount + Qty */}
          <View style={styles.inputRow}>
            <View style={styles.amountContainer}>
              <Text style={styles.sectionLabel}>
                {mode === 'exclusive' ? 'BASE AMOUNT (₹)' : 'TOTAL INCL. GST (₹)'}
              </Text>
              <View style={styles.amountInputWrapper}>
                <Text style={styles.rupeeSymbol}>₹</Text>
                <TextInput
                  style={styles.amountInput}
                  placeholder="0.00"
                  placeholderTextColor="rgba(245,240,224,0.2)"
                  value={amount}
                  onChangeText={handleAmountChange}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                />
              </View>
            </View>

            <View style={styles.qtyContainer}>
              <Text style={styles.sectionLabel}>QTY</Text>
              <TextInput
                style={[styles.amountInput, styles.qtyInput]}
                placeholder="1"
                placeholderTextColor="rgba(245,240,224,0.2)"
                value={qty}
                onChangeText={handleQtyChange}
                keyboardType="number-pad"
                returnKeyType="done"
                textAlign="center"
              />
            </View>
          </View>

          {/* GST Rate */}
          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>GST RATE</Text>
          <View style={styles.rateRow}>
            {GST_RATES.map(r => (
              <TouchableOpacity
                key={r}
                style={[styles.rateBtn, rate === r && styles.rateBtnActive]}
                onPress={() => setRate(r)}
                activeOpacity={0.7}
              >
                <Text style={[styles.rateBtnText, rate === r && styles.rateBtnTextActive]}>
                  {r}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Presets */}
          <View style={styles.presetsRow}>
            {PRESETS.map(p => (
              <TouchableOpacity
                key={p.label}
                style={styles.presetBtn}
                onPress={() => setRate(p.rate)}
                activeOpacity={0.7}
              >
                <Text style={styles.presetText}>{p.icon} {p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Results */}
          {numAmount > 0 ? (
            <View>
              <View style={styles.resultsGrid}>
                <ResultBox label="Taxable Amount" value={formatINR(taxableAmount)} />
                <ResultBox label={`GST @ ${rate}%`} value={formatINR(gstAmount)} accent />
                <ResultBox label="CGST" value={formatINR(cgst)} muted />
                <ResultBox label="SGST / UTGST" value={formatINR(sgst)} muted />
              </View>

              {/* Total */}
              <View style={styles.totalBox}>
                <View>
                  <Text style={styles.totalLabel}>TOTAL PAYABLE</Text>
                  {numQty > 1 && (
                    <Text style={styles.totalQtyNote}>
                      {numQty} × {formatINR(totalAmount / numQty)}
                    </Text>
                  )}
                </View>
                <Text style={styles.totalValue}>{formatINR(totalAmount)}</Text>
              </View>

              {/* Summary */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                  Effective tax: {gstAmount > 0 ? ((gstAmount / taxableAmount) * 100).toFixed(2) : '0.00'}%
                </Text>
                <Text style={styles.summaryText}>Tax: {formatINR(gstAmount)}</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.placeholder}>Enter an amount to calculate</Text>
          )}
        </View>

        <Text style={styles.footer}>CGST + SGST = Total GST · For interstate use IGST</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subheading: {
    fontSize: 10,
    letterSpacing: 4,
    color: '#ffc830',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  title: {
    fontSize: 38,
    fontWeight: '300',
    color: '#f5f0e0',
    letterSpacing: -1,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  titleUnderline: {
    width: 60,
    height: 2,
    backgroundColor: '#ffc830',
    marginTop: 14,
    borderRadius: 1,
  },

  // Card
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,50,0.12)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },

  sectionLabel: {
    fontSize: 9,
    letterSpacing: 3,
    color: 'rgba(245,240,224,0.4)',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // Mode
  modeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  modeBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  modeBtnActive: {
    borderColor: 'rgba(255,200,50,0.5)',
    backgroundColor: 'rgba(255,200,50,0.08)',
  },
  modeBtnLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#f5f0e0',
    marginBottom: 2,
  },
  modeBtnLabelActive: {
    color: '#ffc830',
  },
  modeBtnSub: {
    fontSize: 10,
    color: 'rgba(245,240,224,0.35)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // Inputs
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  amountContainer: {
    flex: 1,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  rupeeSymbol: {
    color: '#ffc830',
    fontSize: 18,
    marginRight: 4,
  },
  amountInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 18,
    color: '#f5f0e0',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  qtyContainer: {
    width: 76,
  },
  qtyInput: {
    flex: undefined,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 14,
    fontSize: 18,
    textAlign: 'center',
  },

  // Rates
  rateRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  rateBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
    alignItems: 'center',
  },
  rateBtnActive: {
    borderColor: 'rgba(255,200,50,0.5)',
    backgroundColor: 'rgba(255,200,50,0.1)',
  },
  rateBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(245,240,224,0.6)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  rateBtnTextActive: {
    color: '#ffc830',
  },

  // Presets
  presetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  presetText: {
    fontSize: 11,
    color: 'rgba(245,240,224,0.4)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,200,50,0.15)',
    marginVertical: 24,
  },

  // Results
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 14,
  },
  resultBox: {
    width: '47.5%',
    padding: 14,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  resultBoxAccent: {
    backgroundColor: 'rgba(255,200,50,0.06)',
    borderColor: 'rgba(255,200,50,0.2)',
  },
  resultBoxMuted: {
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  resultLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: 'rgba(245,240,224,0.35)',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    textTransform: 'uppercase',
  },
  resultLabelMuted: {
    color: 'rgba(245,240,224,0.2)',
  },
  resultValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#f5f0e0',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  resultValueAccent: {
    color: '#ffc830',
  },
  resultValueMuted: {
    color: 'rgba(245,240,224,0.45)',
  },

  // Total
  totalBox: {
    padding: 20,
    borderRadius: 14,
    backgroundColor: 'rgba(255,200,50,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,200,50,0.25)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 10,
    letterSpacing: 3,
    color: 'rgba(245,240,224,0.4)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    marginBottom: 4,
  },
  totalQtyNote: {
    fontSize: 11,
    color: 'rgba(245,240,224,0.3)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffc830',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // Summary
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  summaryText: {
    fontSize: 10,
    color: 'rgba(245,240,224,0.35)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  placeholder: {
    textAlign: 'center',
    paddingVertical: 32,
    color: 'rgba(245,240,224,0.2)',
    fontSize: 13,
    letterSpacing: 2,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  footer: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 10,
    color: 'rgba(245,240,224,0.2)',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    letterSpacing: 1,
  },
});
