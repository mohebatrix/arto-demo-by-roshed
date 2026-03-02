import React, { useState } from 'react';
import {
  TrendingUp, Layers, Package, Percent, Truck, PiggyBank,
  AlertTriangle, DollarSign, Activity, FileText, CheckCircle,
  XCircle, ChevronDown, ChevronUp, Info, BarChart3,
  Users, CreditCard, ShieldAlert, ArrowRight, Menu, X, LayoutDashboard,
  Calculator, ChevronRight, Lock, Sliders
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, ComposedChart, ReferenceLine
} from 'recharts';

// --- NEW DESIGN SYSTEM & STYLES ---
const theme = {
  primary: '#638C80', 
  red: '#D64545',     
  bg: '#F6F1E8',      
  text: '#111111',    
  card: '#FFFFFF',    
  border: '#E5E0D8',  
  green: '#638C80',   
  yellow: '#D4A373'   
};

const cardClass = "bg-[#FFFFFF] rounded-[20px] border border-[#E5E0D8] shadow-sm p-5 hover:shadow-md transition-shadow duration-200 relative group overflow-hidden";

// --- HELPERS ---
const formatCurrency = (value, hideDecimals = false) => {
  if (value === undefined || value === null) return '$0.00';
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  let formatted = '';
  
  if (absValue >= 1000000) {
    formatted = `$${(absValue / 1000000).toFixed(2)}M`;
  } else if (absValue >= 1000) {
    formatted = `$${(absValue / 1000).toFixed(0)}k`;
  } else {
    formatted = `$${absValue.toFixed(hideDecimals ? 0 : 2)}`;
  }
  
  return isNegative ? `(${formatted})` : formatted;
};

const formatPercent = (value) => {
  if (value === undefined || value === null) return '0.0%';
  return `${value.toFixed(1)}%`;
};

// --- DATA CONSTANTS ---
const incomeTrendData = [
  { year: 'FY2022', income: 13271373.90, netIncome: 450000 },
  { year: 'FY2023', income: 14005474.38, netIncome: 520000 },
  { year: 'FY2024', income: 16085638.93, netIncome: 890000 },
  { year: 'FY2025', income: 14385104.30, netIncome: 584240 }
];

const profitBridgeData = [
  { name: 'Reported NI', val: -502188, fill: theme.red },
  { name: '+ Legal Sett.', val: 885000, fill: theme.border },
  { name: '+ Bank Adj.', val: 201428, fill: theme.border },
  { name: 'Normalized NI', val: 584240, fill: theme.primary }
];

const mixDonutData = [
  { name: 'Concrete', value: 9502876.12, color: theme.primary },
  { name: 'Ceramic', value: 3328956.94, color: '#8BAF9F' },
  { name: 'Other', value: 530376.68, color: '#C4D6CE' }
];

const mixBarData = [
  { year: 'FY2024', Concrete: 10328621, Ceramic: 4131053, Other: 718353 },
  { year: 'FY2025', Concrete: 9502876, Ceramic: 3328957, Other: 530376 }
];

const deptMarginData = [
  { name: 'Concrete', gm: 59.4, fill: theme.primary },
  { name: 'Ceramic', gm: 25.4, fill: '#8BAF9F' },
  { name: '3rd Party', gm: 44.7, fill: '#C4D6CE' }
];

const deptGPData = [
  { name: 'Concrete', gp: 5648432, fill: theme.primary },
  { name: 'Ceramic', gp: 845841, fill: '#8BAF9F' },
  { name: '3rd Party', gp: 551949, fill: '#C4D6CE' }
];

const discountCatData = [
  { name: 'FY2025 Discounts', Artillo: 512380, Signature: 206091, Unassigned: 110549, Other: 235882 }
];

const discountTrendData = [
  { year: 'FY2022', amount: 602257 },
  { year: 'FY2024', amount: 891363 },
  { year: 'FY2025', amount: 1064902 }
];

const cogsData = [
  { name: 'Artillo', value: 3468843 },
  { name: 'Signature', value: 1280154 },
  { name: '3rd Party', value: 683141 },
  { name: 'Bisque', value: 484756 },
  { name: 'Premium', value: 362665 },
  { name: 'Roman', value: 341395 },
  { name: 'Handpainted', value: 227886 },
  { name: 'Hand Touched', value: 127650 },
  { name: 'Specialty', value: 44205 }
];

const opexCatData = [
  { name: 'FY2025 OpEx', Wages: 2316008, Outsourcing: 901704, Advertising: 836501, Freight: 830836, Legal: 885000, Other: 1877866 }
];

const wagesData = [
  { name: 'Sales', val: 871807 },
  { name: 'Exec', val: 342623 },
  { name: 'Officer', val: 300000 },
  { name: 'Cust Service', val: 217941 },
  { name: 'Accounting', val: 150466 },
  { name: 'IT', val: 140876 },
  { name: 'Marketing', val: 143497 }
];

const cashTrendData = [
  { month: 'Jun', val: 5488363 },
  { month: 'Jul', val: 5210000 },
  { month: 'Aug', val: 5050000 },
  { month: 'Sep', val: 4980000 },
  { month: 'Oct', val: 5120000 },
  { month: 'Nov', val: 4890000 },
  { month: 'Dec', val: 4755039 }
];

const cashTrapData = [
  { name: 'Liquid Assets', value: 4755039, fill: theme.primary, label: 'Cash in Bank' },
  { name: 'Stuck Assets', value: 515506 + 470694, fill: theme.red, label: 'Inv. + A/R' }
];

// --- COMPONENTS ---

const ActionBanner = ({ title, message, variant = 'primary' }) => {
  const bg = variant === 'primary' ? 'bg-[#638C80]' : 'bg-[#D64545]';
  return (
    <div className={`${bg} text-[#FFFFFF] p-5 rounded-[20px] mb-6 shadow-sm flex items-start sm:items-center flex-col sm:flex-row`}>
      <div className="bg-white/20 p-3 rounded-full mr-4 mb-3 sm:mb-0">
        <Activity size={24} className="text-white" />
      </div>
      <div>
        <h3 className="font-extrabold tracking-wide uppercase text-sm opacity-90 mb-1">{title}</h3>
        <p className="text-base font-medium leading-snug">{message}</p>
      </div>
    </div>
  );
};

const KpiTile = ({ title, value, subtext, icon: Icon, trend, highlight, mathMode, formula, onSelect, data }) => (
  <div 
    onClick={() => onSelect && onSelect(data)}
    className={`${cardClass} flex flex-col justify-between ${onSelect ? 'cursor-pointer' : ''} border-l-4 ${highlight ? 'border-l-[#638C80]' : 'border-l-transparent hover:border-l-[#E5E0D8]'}`}
  >
    {onSelect && (
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={16} className="text-[#638C80]" />
      </div>
    )}

    <div className="flex justify-between items-start mb-2 relative z-10">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</h3>
      {Icon && <Icon size={18} className="text-[#638C80]" />}
    </div>
    
    <div className="relative z-10">
      <div className={`text-[28px] font-extrabold text-[#111111] leading-none mb-2 ${value.includes('(') || value.includes('-') ? 'text-[#D64545]' : ''}`}>
        {value}
      </div>
      
      {mathMode && formula ? (
        <div className="text-[11px] font-mono text-[#638C80] bg-[#F6F1E8] px-2 py-1 rounded inline-block mt-1">
          F: {formula}
        </div>
      ) : (
        <div className="text-xs text-gray-500 font-medium flex items-center mt-1">
          {trend === 'up' && <TrendingUp size={12} className="text-[#638C80] mr-1" />}
          {trend === 'down' && <TrendingUp size={12} className="text-[#D64545] mr-1 transform rotate-180" />}
          {subtext}
        </div>
      )}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E5E0D8] shadow-lg z-50 relative">
        <p className="font-bold text-sm mb-2 text-[#111111]">{label}</p>
        {payload.map((entry, index) => {
          const isNegative = entry.value < 0;
          return (
            <p key={index} className="text-sm font-medium flex items-center justify-between gap-4" style={{ color: entry.color || theme.primary }}>
              <span>{entry.name}:</span>
              <span className={isNegative ? 'text-[#D64545]' : ''}>
                {entry.name.includes('%') || entry.dataKey === 'gm' ? formatPercent(entry.value) : formatCurrency(entry.value)}
              </span>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

const SlideOutDrawer = ({ isOpen, onClose, content, roleView }) => {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="fixed inset-0 bg-[#111111]/10 backdrop-blur-[2px] z-[90]" onClick={onClose} />
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-[#FFFFFF] shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out border-l border-[#E5E0D8] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 border-b border-[#E5E0D8] flex justify-between items-start bg-[#F6F1E8]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#638C80] tracking-widest block mb-1">
              {roleView === 'Owner' ? 'Metric Translation' : 'Metric Analysis'}
            </span>
            <h3 className="font-extrabold text-xl text-[#111111] leading-tight">{content?.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-gray-400 hover:text-[#111111] shadow-sm"><X size={16}/></button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-[#FFFFFF]">
          <div className="mb-8">
            <div className="text-[40px] font-extrabold text-[#111111] mb-2">{content?.value}</div>
            <div className="text-sm font-medium text-gray-500">{content?.subtext}</div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-[#F6F1E8] rounded-xl border border-[#E5E0D8]">
              <div className="flex items-center mb-2">
                <LayoutDashboard size={14} className="text-[#638C80] mr-2"/>
                <span className="text-xs uppercase font-bold text-gray-500">CFO Definition</span>
              </div>
              <p className="font-medium text-[#111111] text-sm">{content?.cfoTerm || "Standard financial metric representation."}</p>
            </div>

            <div className="p-4 bg-[#638C80]/10 rounded-xl border border-[#638C80]/20">
              <div className="flex items-center mb-2">
                <Users size={14} className="text-[#638C80] mr-2"/>
                <span className="text-xs uppercase font-bold text-[#638C80]">Owner Translation</span>
              </div>
              <p className="font-bold text-[#638C80] text-sm">{content?.ownerTerm || "Plain english business equivalent."}</p>
            </div>

            {content?.formula && (
               <div className="mt-4 border-t border-[#E5E0D8] pt-6">
                 <span className="text-xs uppercase font-bold text-gray-400 block mb-2 flex items-center"><Calculator size={14} className="mr-2"/> Calculation Logic</span>
                 <code className="text-sm font-mono text-[#111111] bg-gray-50 p-3 rounded-lg block border border-gray-100">{content.formula}</code>
               </div>
            )}

            {content?.insight && (
               <div className="mt-4 border-t border-[#E5E0D8] pt-6">
                 <span className="text-xs uppercase font-bold text-[#D64545] block mb-2 flex items-center"><Activity size={14} className="mr-2"/> {roleView === 'Owner' ? 'Business Takeaway' : 'Strategic Insight'}</span>
                 <p className="text-sm text-gray-600 leading-relaxed">{content.insight}</p>
               </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- TABS RECONSTRUCTED ---

const TabExecutive = ({ view, t, mathMode, onSelectMetric }) => {
  const isNorm = view === 'Normalized';
  const niValue = isNorm ? 584239.65 : -502187.95;
  const nmValue = isNorm ? 4.06 : -3.49;

  const kpiData = {
    income: { title: t('Total Income', 'Money In'), value: formatCurrency(14385104.30), subtext: t('FY2025', 'This Year'), cfoTerm: 'Total recognized top-line revenue before deductions.', ownerTerm: 'All the money that came through the door this year.', formula: 'Total Sales + Shipping Revenue + Misc Income', insight: t('Top-line shrank 10.5% vs FY24.', 'We made 10.5% less money than last year. We need to figure out why.') },
    sales: { title: t('Total Sales', 'Sales from Products'), value: formatCurrency(13362209.74), subtext: t('Product Net Sales', 'Core Business Earnings'), cfoTerm: 'Gross product revenue minus core trade discounts.', ownerTerm: 'Money made strictly from selling our core products, ignoring extra fees.', formula: 'Concrete + Ceramic + Other Sales', insight: t('Concrete makes up 71% of this.', '71% of our sales come from one thing: Concrete.') },
    gp: { title: t('Gross Profit', 'Money Left After Making Products'), value: formatCurrency(7145727.77), subtext: t('FY2025', 'This Year'), cfoTerm: 'Revenue minus Cost of Goods Sold (COGS).', ownerTerm: 'What\'s left in our pocket after paying for the raw materials and factory labor.', formula: 'Total Income - Total COGS', insight: t('Healthy GP at nearly 50%.', 'We keep about half of what we make before paying rent and office staff, which is good.') },
    gm: { title: t('Gross Margin', 'Product Profit %'), value: '49.7%', subtext: t('7.14M ÷ 14.38M', 'Profit ÷ Sales'), cfoTerm: 'Gross Profit expressed as a percentage of Total Income.', ownerTerm: 'For every $1 in sales, we keep 50 cents before paying for everyday business overhead.', formula: '(Gross Profit / Total Income) * 100', insight: t('Ceramic is dragging this down (25% margin vs Concrete\'s 59%).', 'Our Ceramic products are barely making us any money compared to Concrete.') },
    opex: { title: t('OpEx', 'Everyday Running Costs'), value: formatCurrency(7647915.72), subtext: t('53.2% of Income', 'Costs eat 53% of what we make'), cfoTerm: 'Indirect expenses (SG&A).', ownerTerm: 'The day-to-day cost of keeping the lights on (salaries, marketing, rent, legal).', formula: 'Sum(Overhead)', insight: t('OpEx is exceeding our Gross Profit (53% vs 49%).', 'We are spending more on office and running costs than we actually make from selling products.') },
    ni: { title: t(`Net Income (${view})`, `True Bottom Line (${view})`), value: formatCurrency(niValue), subtext: isNorm ? t("Excludes $1.08M one-timers", "Ignoring weird one-off events") : t("Includes legal adjs", "Includes the big lawsuit payout"), cfoTerm: `The residual earnings (${view} view).`, ownerTerm: 'The true bottom line profit this year. The final amount of money we actually made or lost.', formula: 'Gross Profit - Operating Expenses', insight: t('The $885k legal settlement masked underlying profitability.', 'The massive lawsuit made us look like we lost money, but the actual business operations are profitable.') },
    cash: { title: t('Cash (Dec 2025)', 'Cash in the Bank'), value: formatCurrency(4755039.80), subtext: t('Current ratio 3.80x', 'We have 3.8x more cash than bills'), cfoTerm: 'Total liquid cash available.', ownerTerm: 'Actual money sitting in our bank accounts right now that we can spend.', formula: 'Sum of liquid bank accounts', insight: t('Cash has dropped $733k since June. Need to monitor burn rate.', 'Our bank account balance has dropped by $733k since June. We are spending cash faster than we make it.') }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <ActionBanner 
        title={t("Executive Pulse: FY2025 Review", "Year-End Summary: How We Did")} 
        message={t(
          "Operations are fundamentally profitable. Normalizing for $1.08M in one-time adjustments flips the reported loss into a $584k true profit. Cost control remains critical as OpEx (53.2%) exceeds Gross Margin (49.7%).",
          "If we ignore the weird one-off events like the lawsuit, the business actually made a $584k profit. However, our everyday running costs are too high and are eating up all the money we make from selling products."
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile title={t('Total Income', 'Money In')} value={formatCurrency(14385104.30)} subtext={t('FY2025', 'This Year')} icon={DollarSign} mathMode={mathMode} formula="Sales + Misc" onSelect={onSelectMetric} data={kpiData.income} />
        <KpiTile title={t('Gross Profit', 'Money Left After Making Products')} value={formatCurrency(7145727.77)} subtext={t('FY2025', 'This Year')} icon={TrendingUp} mathMode={mathMode} formula="Income - COGS" onSelect={onSelectMetric} data={kpiData.gp} />
        <KpiTile title={t('OpEx', 'Everyday Running Costs')} value={formatCurrency(7647915.72)} subtext={t('53.2% of Income', 'Eats 53% of our money')} icon={Activity} mathMode={mathMode} formula="Sum(Overhead)" onSelect={onSelectMetric} data={kpiData.opex} />
        <KpiTile title={t(`Net Income (${view})`, `True Bottom Line (${view})`)} value={formatCurrency(niValue)} subtext={isNorm ? t("Excludes $1.08M one-timers", "Ignoring unusual events") : t("Includes legal adjs", "Includes lawsuit payout")} icon={FileText} highlight mathMode={mathMode} formula="GP - OpEx" onSelect={onSelectMetric} data={kpiData.ni} />
        
        <KpiTile title={t('Total Sales', 'Sales from Products')} value={formatCurrency(13362209.74)} subtext={t('Product Net Sales', 'Money kept from products')} icon={Package} mathMode={mathMode} formula="Gross - Discounts" onSelect={onSelectMetric} data={kpiData.sales} />
        <KpiTile title={t('Gross Margin', 'Product Profit %')} value="49.7%" subtext={t('7.14M ÷ 14.38M', 'Profit ÷ Sales')} icon={Percent} mathMode={mathMode} formula="GP / Income" onSelect={onSelectMetric} data={kpiData.gm} />
        <KpiTile title={t(`Net Margin (${view})`, `Bottom Line %`)} value={`${nmValue}%`} subtext={t("of Total Income", "of all money in")} icon={Percent} mathMode={mathMode} formula="NI / Income" onSelect={onSelectMetric} data={kpiData.ni} />
        <KpiTile title={t('Cash (Dec 2025)', 'Cash in the Bank')} value={formatCurrency(4755039.80)} subtext={t('Current ratio 3.80x', 'We have 3.8x more cash than bills')} icon={PiggyBank} highlight mathMode={mathMode} formula="Liquid Assets" onSelect={onSelectMetric} data={kpiData.cash} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6 flex items-center">
            <Activity className="mr-2 text-[#638C80]" size={18}/> 
            {t('Revenue vs Net Income Trends', 'Sales vs Take-Home Profit')}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={incomeTrendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
              <YAxis yAxisId="left" tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(val) => `$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
              <Legend wrapperStyle={{paddingTop: '20px', fontSize: '12px', fontWeight: 600}} />
              <Bar yAxisId="left" dataKey="income" name={t('Gross Income', 'Total Money In')} fill="#E5E0D8" radius={[4, 4, 0, 0]} barSize={40} />
              <Line yAxisId="right" type="monotone" dataKey="netIncome" name={t('Net Income', 'Take-Home Profit')} stroke={theme.primary} strokeWidth={4} dot={{ r: 6, fill: theme.primary, stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className={cardClass}>
          <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6 flex items-center">
            <TrendingUp className="mr-2 text-[#638C80]" size={18}/> 
            {t('Profit Bridge (FY25)', 'How we got to our Final Profit')}
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={profitBridgeData.map(d => ({...d, name: t(d.name, d.name.replace('NI', 'Profit').replace('Reported', 'On Paper').replace('Normalized', 'True'))}))} layout="vertical" margin={{ left: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
              <XAxis type="number" tickFormatter={(val) => `$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
              <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
              <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={32}>
                {profitBridgeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const TabRevenue = ({ t, mathMode }) => (
  <div className="space-y-6 animate-fadeIn">
    <ActionBanner 
      variant="danger"
      title={t("Dependency Risk Alert", "Warning: Too Reliant on One Product")} 
      message={t(
        "Concrete sales represent over 71% of our product mix. The high reliance on a single core product exposes the business to structural market risks if demand shifts.",
        "Sales of Concrete make up 71% of our business. If people stop buying Concrete, our entire business is at massive risk. We need to sell more of our other things."
      )}
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-2">{t('Product Sales Concentration', 'What We Actually Sold')} (FY2025)</h3>
        <div className="relative h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={mixDonutData.map(d => ({...d, name: t(d.name, `Sales from ${d.name}`)}))} innerRadius={80} outerRadius={110} paddingAngle={4} dataKey="value" stroke="none">
                {mixDonutData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-20px]">
            <span className="text-xs uppercase font-bold text-gray-500 tracking-widest">{t('Total Sales', 'Total')}</span>
            <span className="text-2xl font-extrabold text-[#111111]">{formatCurrency(13362209, true)}</span>
            <span className="text-sm font-bold text-[#638C80] mt-1">{t('71% Concrete', 'Mostly Concrete')}</span>
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Mix Trend', 'Sales Trend')} (FY24 vs FY25)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={mixBarData} barSize={60}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12, fontWeight: 600}} />
            <YAxis tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
            <Bar dataKey="Concrete" name={t('Concrete', 'Concrete Sales')} stackId="a" fill={theme.primary} />
            <Bar dataKey="Ceramic" name={t('Ceramic', 'Ceramic Sales')} stackId="a" fill="#8BAF9F" />
            <Bar dataKey="Other" name={t('Other', 'Other Sales')} stackId="a" fill="#C4D6CE" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const TabMargins = ({ t, mathMode }) => {
  const [openAcc, setOpenAcc] = useState('concrete');
  const gmLabel = t('GM', 'Profit %');

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${cardClass} border-t-4 border-t-[#638C80]`}>
          <h3 className="font-extrabold text-lg mb-4 flex justify-between">Concrete <span className="text-[#638C80]">59.4% {gmLabel}</span></h3>
          <div className="space-y-2 text-sm font-medium">
            <div className="flex justify-between"><span>{t('Revenue:', 'Money In:')}</span> <span className="font-bold">{formatCurrency(9502876.12)}</span></div>
            <div className="flex justify-between text-gray-500"><span>{t('COGS', 'Cost to Make')}:</span> <span>{formatCurrency(3854443.74)}</span></div>
            <div className="w-full h-px bg-[#E5E0D8] my-2"></div>
            <div className="flex justify-between font-bold text-[#638C80]"><span>{t('Gross Profit', 'Leftover Profit')}:</span> <span>{formatCurrency(5648432.38)}</span></div>
          </div>
        </div>
        <div className={`${cardClass} border-t-4 border-t-[#8BAF9F]`}>
          <h3 className="font-extrabold text-lg mb-4 flex justify-between">Ceramic <span className="text-[#8BAF9F]">25.4% {gmLabel}</span></h3>
          <div className="space-y-2 text-sm font-medium">
            <div className="flex justify-between"><span>{t('Revenue:', 'Money In:')}</span> <span className="font-bold">{formatCurrency(3328956.94)}</span></div>
            <div className="flex justify-between text-gray-500"><span>{t('COGS', 'Cost to Make')}:</span> <span>{formatCurrency(2483115.60)}</span></div>
            <div className="w-full h-px bg-[#E5E0D8] my-2"></div>
            <div className="flex justify-between font-bold text-[#638C80]"><span>{t('Gross Profit', 'Leftover Profit')}:</span> <span>{formatCurrency(845841.34)}</span></div>
          </div>
        </div>
        <div className={`${cardClass} border-t-4 border-t-[#C4D6CE]`}>
          <h3 className="font-extrabold text-lg mb-4 flex justify-between">3rd Party <span className="text-sm bg-[#F6F1E8] px-2 py-0.5 rounded text-[#111111]">44.7% {gmLabel}</span></h3>
          <div className="space-y-2 text-sm font-medium">
            <div className="flex justify-between"><span>{t('Revenue:', 'Money In:')}</span> <span className="font-bold">{formatCurrency(1235090.73)}</span></div>
            <div className="flex justify-between text-gray-500"><span>{t('COGS', 'Cost to Make')}:</span> <span>{formatCurrency(683141.66)}</span></div>
            <div className="w-full h-px bg-[#E5E0D8] my-2"></div>
            <div className="flex justify-between font-bold text-[#638C80]"><span>{t('Gross Profit', 'Leftover Profit')}:</span> <span>{formatCurrency(551949.07)}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Gross Margin % by Dept', 'Profit % by Department')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptMarginData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
              <YAxis tickFormatter={(val) => `${val}%`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
              <Bar dataKey="gm" name={t('Margin', 'Profit %')} radius={[4, 4, 0, 0]} barSize={50}>
                {deptMarginData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className={cardClass}>
          <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Gross Profit ($) by Dept', 'Actual Dollars Made by Department')}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={deptGPData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
              <YAxis tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
              <Bar dataKey="gp" name={t('Profit', 'Dollars Profit')} radius={[4, 4, 0, 0]} barSize={50}>
                {deptGPData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-4">{t('Sub-Product Drilldowns', 'Details by Specific Item')}</h3>
        <div className="space-y-3">
          <div className="border border-[#E5E0D8] rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpenAcc(openAcc === 'concrete' ? '' : 'concrete')}
              className="w-full flex justify-between items-center p-4 bg-[#F6F1E8] hover:bg-[#E5E0D8] transition-colors"
            >
              <span className="font-bold flex items-center text-[#111111]"><Layers className="mr-2 text-[#638C80]" size={16}/> Concrete Lines</span>
              {openAcc === 'concrete' ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            </button>
            {openAcc === 'concrete' && (
              <div className="p-4 bg-white grid grid-cols-1 gap-2 text-sm font-medium">
                <div className="flex justify-between p-2 border-b border-gray-100"><span className="font-bold text-[#111111]">Artillo</span> <span className="text-gray-600">Rev: $8.63M | {t('COGS', 'Cost')}: $3.47M</span></div>
                <div className="flex justify-between p-2 border-b border-gray-100"><span className="font-bold text-[#111111]">Roman</span> <span className="text-gray-600">Rev: $768k | {t('COGS', 'Cost')}: $341k</span></div>
                <div className="flex justify-between p-2"><span className="font-bold text-[#111111]">Special Concrete</span> <span className="text-gray-600">Rev: $101k | {t('COGS', 'Cost')}: $44k</span></div>
              </div>
            )}
          </div>

          <div className="border border-[#E5E0D8] rounded-xl overflow-hidden">
            <button 
              onClick={() => setOpenAcc(openAcc === 'ceramic' ? '' : 'ceramic')}
              className="w-full flex justify-between items-center p-4 bg-[#F6F1E8] hover:bg-[#E5E0D8] transition-colors"
            >
              <span className="font-bold flex items-center text-[#111111]"><Package className="mr-2 text-[#638C80]" size={16}/> Ceramic Lines</span>
              {openAcc === 'ceramic' ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
            </button>
            {openAcc === 'ceramic' && (
              <div className="p-4 bg-white grid grid-cols-1 gap-2 text-sm font-medium">
                <div className="flex justify-between p-2 border-b border-gray-100"><span className="font-bold text-[#111111]">Signature</span> <span className="text-gray-600">Rev: $2.31M | {t('COGS', 'Cost')}: $1.28M</span></div>
                <div className="flex justify-between p-2 border-b border-[#D64545]/20 bg-[#D64545]/5 rounded">
                  <span className="font-bold text-[#D64545] flex items-center"><AlertTriangle size={14} className="mr-1"/> Premium</span> 
                  <span className="text-[#D64545]">Rev: $158k | {t('COGS', 'Cost')}: $362k ({t('Neg Profit', 'Losing Money')})</span>
                </div>
                <div className="flex justify-between p-2 border-b border-gray-100"><span className="font-bold text-[#111111]">Bisque</span> <span className="text-gray-600">Rev: $319k | {t('COGS', 'Cost')}: $484k</span></div>
                <div className="flex justify-between p-2 border-b border-gray-100"><span className="font-bold text-[#111111]">Handpainted</span> <span className="text-gray-600">Rev: $384k | {t('COGS', 'Cost')}: $227k</span></div>
                <div className="flex justify-between p-2"><span className="font-bold text-[#111111]">Hand Touched</span> <span className="text-gray-600">Rev: $152k | {t('COGS', 'Cost')}: $127k</span></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const TabDiscounts = ({ t, mathMode }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KpiTile title={t('Total Discounts', 'Money Given Away (Discounts)')} value={formatCurrency(1064902.20)} subtext={t('FY2025', 'This Year')} icon={DollarSign} mathMode={mathMode} formula="Total Discs" />
      <KpiTile title={t('Discount Rate', '% of Sales Given Away')} value="8.0%" subtext={t('of Total Sales', 'of our possible money')} icon={Percent} highlight mathMode={mathMode} formula="Discs / Sales" />
      <div className={`md:col-span-2 ${cardClass} bg-[#F6F1E8]`}>
        <h3 className="font-extrabold uppercase text-xs tracking-widest text-[#111111] mb-2">{t('Top Discount Pools', 'Where We Give Away the Most Money')}</h3>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="bg-white px-4 py-3 rounded-xl border border-[#E5E0D8] shadow-sm flex-1 min-w-[120px]">
            <div className="text-xs font-bold text-gray-500 uppercase">Artillo</div>
            <div className="font-extrabold text-lg text-[#111111]">{formatCurrency(512380)}</div>
          </div>
          <div className="bg-white px-4 py-3 rounded-xl border border-[#E5E0D8] shadow-sm flex-1 min-w-[120px]">
            <div className="text-xs font-bold text-gray-500 uppercase">Signature</div>
            <div className="font-extrabold text-lg text-[#111111]">{formatCurrency(206091)}</div>
          </div>
          <div className="bg-white px-4 py-3 rounded-xl border border-[#E5E0D8] shadow-sm flex-1 min-w-[120px]">
            <div className="text-xs font-bold text-gray-500 uppercase">Unassigned</div>
            <div className="font-extrabold text-lg text-[#111111]">{formatCurrency(110549)}</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Discounts by Category', 'Who is giving discounts?')}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={discountCatData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
            <XAxis type="number" tickFormatter={(val) => `$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <YAxis type="category" dataKey="name" hide />
            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
            <Bar dataKey="Artillo" stackId="a" fill={theme.primary} />
            <Bar dataKey="Signature" stackId="a" fill="#8BAF9F" />
            <Bar dataKey="Unassigned" stackId="a" fill="#C4D6CE" />
            <Bar dataKey="Other" stackId="a" fill="#E5E0D8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Discount Trend (Multi-year)', 'Are we giving away more over time?')}</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={discountTrendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} dy={10} />
            <YAxis tickFormatter={(val) => `$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="amount" name={t("Discounts", "Money Given Away")} stroke={theme.red} strokeWidth={4} dot={{ r: 6, fill: theme.red, stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const TabCOGS = ({ t, mathMode }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiTile title={t('Total COGS', 'Total Cost to Make Products')} value={formatCurrency(7239376.53)} subtext={t('FY2025', 'This Year')} icon={BarChart3} mathMode={mathMode} formula="Materials + Labor" />
      <KpiTile title={t('COGS % of Income', 'Cost as % of Sales')} value="50.3%" subtext={t('7.23M ÷ 14.38M', 'Cost ÷ Total Income')} icon={Percent} highlight mathMode={mathMode} formula="COGS / Income" />
      <div className={`${cardClass} bg-[#F6F1E8]`}>
        <h3 className="font-extrabold uppercase text-xs tracking-widest text-[#111111] mb-2">{t('Notable Shrinkage Adjustments', 'Lost, Broken, or Missing Items')}</h3>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between bg-white px-3 py-2 rounded-lg border border-[#638C80]/30 text-sm font-medium shadow-sm">
            <span>Artillo {t('Shrinkage', 'Loss')} (Credit)</span>
            <span className="font-bold text-[#638C80]">($47,313.67)</span>
          </div>
          <div className="flex justify-between bg-white px-3 py-2 rounded-lg border border-[#638C80]/30 text-sm font-medium shadow-sm">
            <span>Unassigned {t('Shrinkage', 'Loss')}</span>
            <span className="font-bold text-[#638C80]">($8,191.91)</span>
          </div>
        </div>
      </div>
    </div>

    <div className={cardClass}>
      <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('COGS Composition', 'What are we spending money on to build things?')}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cogsData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} angle={-45} textAnchor="end" height={60} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
          <YAxis tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
          <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
          <Bar dataKey="value" name={t('COGS', 'Cost to Make')} fill={theme.primary} radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className={`${cardClass} border-dashed`}>
      <div className="flex items-center mb-4">
        <Activity className="mr-2 text-[#638C80]" size={18} />
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111]">{t('Overhead Anatomy (NetSuite Rollup)', 'Cost Breakdown Summary')}</h3>
      </div>
      <p className="text-sm font-medium text-gray-500 mb-4">{t('Components bundled inside categories above. Select to highlight (Simulated UI).', 'The tiny details that make up the big numbers above. Select to view.')}</p>
      <div className="flex flex-wrap gap-2">
        {[t('Rent & Leases', 'Rent'), t('Utilities', 'Power & Water'), t('Production Mgmt Wages', 'Factory Manager Pay'), t('Manufacturing Supplies', 'Factory Tools & Supplies'), t('Outside Service/Plating', 'Outside Work'), t('Freight In', 'Shipping Materials to us'), t('Depreciation', 'Equipment Aging')].map((chip, i) => (
          <button key={i} className="px-4 py-2 rounded-full border border-[#E5E0D8] bg-white text-sm font-bold text-gray-600 hover:bg-[#638C80] hover:text-white hover:border-[#638C80] transition-all cursor-pointer shadow-sm">
            {chip}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const TabOpEx = ({ t, mathMode }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiTile title={t('Total OpEx', 'Total Everyday Running Costs')} value={formatCurrency(7647915.72)} subtext={t('53.2% of Total Income', 'Eats 53% of our money')} icon={Activity} highlight mathMode={mathMode} formula="Sum(OpEx)" />
      <KpiTile title={t('Wages & Fees', 'Payroll & Contractor Bills')} value={formatCurrency(2316008.51)} subtext={t('Largest controllable pool', 'Our biggest expense')} icon={Users} mathMode={mathMode} formula="Payroll" />
      <KpiTile title={t('Legal Settlements', 'Lawsuit Payouts')} value={formatCurrency(885000)} subtext={t('One-time adjustment', 'Hopefully never again')} icon={ShieldAlert} mathMode={mathMode} formula="Legal" />
      <KpiTile title={t('Bank Adjustment', 'Weird Bank Corrections')} value={formatCurrency(201427.60)} subtext={t('Probable one-time', 'One-time hit')} icon={CreditCard} mathMode={mathMode} formula="Bank Adj" />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Top Operating Expenses', 'Biggest Everyday Costs')} (FY25)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={opexCatData} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
            <XAxis type="number" tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <YAxis type="category" dataKey="name" hide />
            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
            <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600 }}/>
            <Bar dataKey="Wages" name={t("Wages", "Payroll")} stackId="a" fill={theme.primary} />
            <Bar dataKey="Outsourcing" name={t("Outsourcing", "Contractors")} stackId="a" fill="#8BAF9F" />
            <Bar dataKey="Advertising" name={t("Advertising", "Marketing")} stackId="a" fill="#C4D6CE" />
            <Bar dataKey="Freight" name={t("Freight", "Shipping Out")} stackId="a" fill="#E5E0D8" />
            <Bar dataKey="Legal" name={t("Legal", "Lawyers")} stackId="a" fill="#111111" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Wages & Fees by Function', 'Who gets paid the most?')}</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={wagesData} layout="vertical" margin={{ left: 50 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
            <XAxis type="number" tickFormatter={(val) => `$${val/1000}k`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
            <Bar dataKey="val" name={t("Amount", "Pay")} fill={theme.primary} radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const TabCash = ({ t, mathMode }) => (
  <div className="space-y-6 animate-fadeIn">
    <div className="bg-[#FFFFFF] border border-[#E5E0D8] rounded-[20px] shadow-sm p-8 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#638C80]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="flex items-center mb-6 md:mb-0 relative z-10">
        <div className="p-5 bg-[#638C80] rounded-2xl mr-5 shadow-lg">
          <PiggyBank size={36} className="text-white" />
        </div>
        <div>
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{t('Cash Reserves', 'Money in the Bank right now')} (Dec 2025)</h2>
          <div className="text-5xl font-extrabold text-[#111111] tracking-tight">{formatCurrency(4755039.80)}</div>
        </div>
      </div>
      
      <div className="flex gap-8 text-center relative z-10">
        <div className="bg-[#F6F1E8] p-4 rounded-xl border border-[#E5E0D8]">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('Working Capital', 'Free Cash for Operations')}</div>
          <div className="text-2xl font-bold text-[#111111]">{formatCurrency(4231362.25)}</div>
          {mathMode && <div className="text-[10px] text-[#638C80] mt-1 font-mono">Assets - Liabs</div>}
        </div>
        <div className="bg-[#F6F1E8] p-4 rounded-xl border border-[#E5E0D8]">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{t('Current Ratio', 'Can we pay our bills? (Score)')}</div>
          <div className="text-2xl font-bold text-[#638C80]">3.80x</div>
          {mathMode && <div className="text-[10px] text-[#638C80] mt-1 font-mono">Assets / Liabs</div>}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-2 flex justify-between">
          <span>{t('Liquidity Profile', 'Cash vs Money Tied Up')}</span>
          <Lock size={16} className="text-[#638C80]"/>
        </h3>
        <p className="text-xs text-gray-500 mb-6 font-medium">{t('Comparing liquid cash against capital tied up in inventory and unpaid invoices.', 'Showing the money we can spend right now vs the money stuck in warehouses and owed by customers.')}</p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={cashTrapData.map(d => ({...d, label: t(d.name, d.label)}))} layout="vertical" margin={{ left: 30, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E0D8" />
            <XAxis type="number" tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
            <YAxis type="category" dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
            <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
            <Bar dataKey="value" name={t("Amount", "Value")} radius={[0, 6, 6, 0]} barSize={40}>
              {cashTrapData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={cardClass}>
        <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Cash Trend', 'How our bank balance changed')} (Jun - Dec 2025)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={cashTrendData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#111111', fontSize: 12, fontWeight: 600}} dy={10} />
            <YAxis tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} domain={['dataMin - 200000', 'dataMax + 200000']} />
            <RechartsTooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="val" name={t("Cash", "Money")} stroke={theme.primary} strokeWidth={4} dot={{ r: 6, fill: theme.primary, stroke: '#fff', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-gray-600 font-medium flex items-center bg-[#F6F1E8] p-3 rounded-lg border border-[#E5E0D8]">
          <span className="flex items-center text-[#D64545] font-bold mr-2"><TrendingUp className="transform rotate-180 mr-1" size={16}/> -$733k (-13.4%)</span>
          {t('cash burn since June.', 'less money in the bank since June.')}
        </div>
      </div>
    </div>
  </div>
);

const TabAlerts = ({ t }) => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
    <div className="lg:col-span-1 space-y-4">
      <h2 className="text-xl font-extrabold mb-4 flex items-center text-[#111111]"><Activity className="mr-2 text-[#638C80]"/> {t('Health Monitor', 'Business Health Check')}</h2>
      
      <div className={`${cardClass} border-l-4 border-l-[#D64545]`}>
        <h3 className="font-extrabold uppercase tracking-widest text-xs text-[#D64545] mb-4 flex items-center"><XCircle size={16} className="mr-2"/> {t('Critical Actions', 'Fix This Immediately')}</h3>
        <ul className="space-y-4 mt-3">
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg">
            <div className="font-bold text-[#111111]">{t('Discounts > 7%', 'Giving away too much money (Discounts > 7%)')}</div>
            <div className="text-[#D64545] font-extrabold mt-1">{t('Current', 'Right now')}: 8.0%</div>
          </li>
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg">
            <div className="font-bold text-[#111111]">{t('Department GM Gap > 25 pts', 'Huge difference in product profits')}</div>
            <div className="text-[#D64545] font-extrabold mt-1">Concrete 59.4% vs Ceramic 25.4%</div>
          </li>
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg">
            <div className="font-bold text-[#111111]">{t('Cash down > 10% in 6m', 'Bank balance dropping fast')}</div>
            <div className="text-[#D64545] font-extrabold mt-1">{t('Current', 'Right now')}: -13.4%</div>
          </li>
        </ul>
      </div>

      <div className={`${cardClass} border-l-4 border-l-[#D4A373]`}>
        <h3 className="font-extrabold uppercase tracking-widest text-xs text-[#D4A373] mb-4 flex items-center"><AlertTriangle size={16} className="mr-2"/> {t('Warning', 'Keep an Eye on This')}</h3>
        <ul className="space-y-4 mt-3">
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg flex justify-between items-center">
            <div className="font-bold text-[#111111]">{t('OpEx > 45%', 'Running costs are too high')}</div>
            <div className="text-[#D4A373] font-extrabold">53.2%</div>
          </li>
        </ul>
      </div>

      <div className={`${cardClass} border-l-4 border-l-[#638C80]`}>
        <h3 className="font-extrabold uppercase tracking-widest text-xs text-[#638C80] mb-4 flex items-center"><CheckCircle size={16} className="mr-2"/> {t('Healthy', 'Doing Great')}</h3>
        <ul className="space-y-4 mt-3">
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg flex justify-between items-center">
            <div className="font-bold text-[#111111]">{t('Current ratio > 2.0x', 'We can pay our bills')}</div>
            <div className="text-[#638C80] font-extrabold">3.80x</div>
          </li>
          <li className="text-sm bg-[#F6F1E8] p-3 rounded-lg flex justify-between items-center">
            <div className="font-bold text-[#111111]">{t('Gross margin > 45%', 'Good overall product profit')}</div>
            <div className="text-[#638C80] font-extrabold">49.7%</div>
          </li>
        </ul>
      </div>
    </div>

    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-xl font-extrabold mb-4 flex items-center text-[#111111]"><FileText className="mr-2 text-[#638C80]"/> {t('Executive Playbook', 'Action Plan / What to do next')}</h2>
      
      <div className={cardClass}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-extrabold text-lg text-[#111111]">{t("Raise Ceramic GM from 25.4% → 35%", "Make Ceramic products more profitable (Aim for 35%)")}</h3>
          <span className="px-3 py-1 bg-[#D4A373]/20 text-[#D4A373] text-xs font-bold rounded-full uppercase tracking-wider">{t('In Progress', 'Working on it')}</span>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-4">
          {t(
            "Focus areas: Pricing adjustments, labor routing efficiency, BOM accuracy, and scrap reduction. Immediate priority on Premium line (currently negative GP).",
            "How to fix: Check our prices, track factory worker time better, ensure material recipes are right, and waste less material. Start with the Premium line since we are losing money on every sale."
          )}
        </p>
        <div className="flex gap-4 text-xs font-bold text-gray-500 bg-[#F6F1E8] p-3 rounded-lg">
          <span><strong className="text-[#111111]">{t('Owner:', 'Who:')}</strong> Ops Lead</span>
          <span><strong className="text-[#111111]">{t('Due:', 'When:')}</strong> Q2 FY26</span>
          <span><strong className="text-[#111111]">{t('Impact:', 'Goal:')}</strong> Ceramic {t('GM', 'Profitability')}</span>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-extrabold text-lg text-[#111111]">{t("Reduce discount rate from 8.0% → 6.0%", "Stop giving away so much money (Lower discounts to 6%)")}</h3>
          <span className="px-3 py-1 bg-[#D64545]/10 text-[#D64545] text-xs font-bold rounded-full uppercase tracking-wider">{t('High Priority', 'Do this now')}</span>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-4">
          {t(
            "Audit sales reps relying heavily on Artillo and Signature discounts to close deals. Implement stricter approval tiers in CRM.",
            "Check which salespeople are giving away the most discounts just to close deals. Make them ask for permission before lowering the price."
          )}
        </p>
        <div className="flex gap-4 text-xs font-bold text-gray-500 bg-[#F6F1E8] p-3 rounded-lg">
          <span><strong className="text-[#111111]">{t('Owner:', 'Who:')}</strong> Head of Sales</span>
          <span><strong className="text-[#111111]">{t('Due:', 'When:')}</strong> End of Month</span>
          <span><strong className="text-[#111111]">{t('Impact:', 'Goal:')}</strong> Net Sales / Margin</span>
        </div>
      </div>

      <div className={cardClass}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-extrabold text-lg text-[#111111]">{t('OpEx reset: Target <45% of income', 'Cut overhead costs: Spend less than 45% of what we earn')}</h3>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded-full uppercase tracking-wider">Planning</span>
        </div>
        <p className="text-sm text-gray-600 font-medium mb-4">
          {t(
            "Current load is 53.2%. Requires reviewing Outsourcing & Prof Fees ($901k) and evaluating marketing spend ROI ($836k).",
            "We are spending 53% of our money just running the office. We need to look closely at what we pay outside contractors ($901k) and if our marketing is actually working ($836k)."
          )}
        </p>
        <div className="flex gap-4 text-xs font-bold text-gray-500 bg-[#F6F1E8] p-3 rounded-lg">
          <span><strong className="text-[#111111]">{t('Owner:', 'Who:')}</strong> CFO</span>
          <span><strong className="text-[#111111]">{t('Due:', 'When:')}</strong> FY26 Budgeting</span>
          <span><strong className="text-[#111111]">{t('Impact:', 'Goal:')}</strong> Net Margin</span>
        </div>
      </div>
    </div>
  </div>
);

const TabScenarioPlanner = ({ t, mathMode }) => {
  const [volGrowth, setVolGrowth] = useState(0);
  const [priceInc, setPriceInc] = useState(0);
  const [cogsRate, setCogsRate] = useState(50.3);
  const [opexRate, setOpexRate] = useState(45.6);

  const baseIncome = 14385104;
  const baseCOGS = 7239376;
  const baseOpex = 6561488; // Normalized OpEx
  const baseNI = 584240;

  // Math: Price increases drop straight to bottom line (no extra COGS volume)
  const newVolumeRevenue = baseIncome * (1 + volGrowth / 100);
  const projIncome = newVolumeRevenue * (1 + priceInc / 100);
  const projCOGS = newVolumeRevenue * (cogsRate / 100);
  const projOpex = projIncome * (opexRate / 100);
  const projNI = projIncome - projCOGS - projOpex;
  const projMargin = (projNI / projIncome) * 100;
  
  const diffNI = projNI - baseNI;

  const chartData = [
    { name: t('Base (FY25)', 'Current Year'), Income: baseIncome, COGS: baseCOGS, OpEx: baseOpex, Profit: baseNI },
    { name: t('Projected', 'What-If'), Income: projIncome, COGS: projCOGS, OpEx: projOpex, Profit: projNI },
  ];

  const applyPreset = (vol, price, cogs, opex) => {
    setVolGrowth(vol);
    setPriceInc(price);
    setCogsRate(cogs);
    setOpexRate(opex);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <ActionBanner 
        title={t("Scenario Planner", "What-If Machine")} 
        message={t(
          "Model forward-looking financial outcomes by decoupling volume growth from pricing power.",
          "Play with the numbers below! Notice how raising prices boosts your profit much faster than just selling more volume, because price increases don't add to your manufacturing costs."
        )}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Panel */}
        <div className={`${cardClass} lg:col-span-1 bg-[#F6F1E8] border-none flex flex-col`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] flex items-center">
              <Sliders className="mr-2 text-[#638C80]" size={18}/> 
              {t('Adjust Levers', 'Change the Numbers')}
            </h3>
          </div>
          
          <div className="space-y-6 flex-1">
            {/* Lever 1 */}
            <div>
              <label className="flex justify-between text-sm font-bold text-[#111111] mb-2">
                <span>{t('Volume Growth', 'Sell More Products')}</span>
                <span className={volGrowth < 0 ? 'text-[#D64545]' : 'text-[#638C80]'}>{volGrowth > 0 ? '+' : ''}{volGrowth}%</span>
              </label>
              <input type="range" min="-20" max="30" step="1" value={volGrowth} onChange={(e) => setVolGrowth(Number(e.target.value))} className="w-full accent-[#638C80]" />
              {mathMode && <div className="text-[10px] text-gray-500 font-mono mt-1">Changes Base Volume</div>}
            </div>

            {/* Lever 2 */}
            <div>
              <label className="flex justify-between text-sm font-bold text-[#111111] mb-2">
                <span>{t('Price Increase', 'Raise Prices')}</span>
                <span className={priceInc < 0 ? 'text-[#D64545]' : 'text-[#638C80]'}>{priceInc > 0 ? '+' : ''}{priceInc}%</span>
              </label>
              <input type="range" min="-10" max="20" step="1" value={priceInc} onChange={(e) => setPriceInc(Number(e.target.value))} className="w-full accent-[#638C80]" />
              {mathMode && <div className="text-[10px] text-[#638C80] font-mono mt-1 font-bold">Price changes carry 0% COGS!</div>}
            </div>

            {/* Lever 3 */}
            <div>
              <label className="flex justify-between text-sm font-bold text-[#111111] mb-2">
                <span>{t('COGS % of Volume', 'Cost to Make Things %')}</span>
                <span className="text-[#111111]">{cogsRate}%</span>
              </label>
              <input type="range" min="30" max="70" step="0.5" value={cogsRate} onChange={(e) => setCogsRate(Number(e.target.value))} className="w-full accent-[#638C80]" />
            </div>

            {/* Lever 4 */}
            <div>
              <label className="flex justify-between text-sm font-bold text-[#111111] mb-2">
                <span>{t('OpEx % of Revenue', 'Running Costs %')}</span>
                <span className="text-[#111111]">{opexRate}%</span>
              </label>
              <input type="range" min="30" max="70" step="0.5" value={opexRate} onChange={(e) => setOpexRate(Number(e.target.value))} className="w-full accent-[#638C80]" />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="mt-8 pt-6 border-t border-[#E5E0D8]">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">{t('Quick Scenarios', 'Try These Ideas')}</h4>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => applyPreset(0, 0, 50.3, 45.6)} className="py-2 px-2 bg-white border border-[#E5E0D8] rounded-lg text-[10px] font-bold uppercase text-gray-500 hover:text-[#111111] hover:border-[#111111] transition-all">Baseline</button>
              <button onClick={() => applyPreset(0, 5, 50.3, 45.6)} className="py-2 px-2 bg-white border border-[#638C80]/30 rounded-lg text-[10px] font-bold uppercase text-[#638C80] hover:bg-[#638C80] hover:text-white transition-all">+5% Price</button>
              <button onClick={() => applyPreset(15, 0, 53.0, 46.5)} className="py-2 px-2 bg-white border border-[#D4A373]/30 rounded-lg text-[10px] font-bold uppercase text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-all">Volume Trap</button>
              <button onClick={() => applyPreset(0, 0, 48.0, 43.0)} className="py-2 px-2 bg-white border border-[#111111]/30 rounded-lg text-[10px] font-bold uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-all">Lean Ops</button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className={cardClass}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{t('Projected Income', 'New Total Sales')}</div>
              <div className="text-2xl font-extrabold text-[#111111]">{formatCurrency(projIncome)}</div>
            </div>
            <div className={cardClass}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{t('Projected Margin', 'New Profit %')}</div>
              <div className={`text-2xl font-extrabold ${projMargin < 0 ? 'text-[#D64545]' : 'text-[#638C80]'}`}>{projMargin.toFixed(1)}%</div>
            </div>
            <div className={`${cardClass} border-l-4 ${projNI < 0 ? 'border-l-[#D64545]' : 'border-l-[#638C80]'}`}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{t('Projected Net Profit', 'New Bottom Line')}</div>
              <div className={`text-2xl font-extrabold ${projNI < 0 ? 'text-[#D64545]' : 'text-[#111111]'}`}>{formatCurrency(projNI)}</div>
              <div className={`text-xs font-bold mt-1 ${diffNI < 0 ? 'text-[#D64545]' : 'text-[#638C80]'}`}>
                {diffNI > 0 ? '+' : ''}{formatCurrency(diffNI)} vs Base
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="font-extrabold uppercase text-sm tracking-widest text-[#111111] mb-6">{t('Income & Expense Comparison', 'Before vs After')}</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E0D8" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#111111', fontWeight: 600, fontSize: 12}} />
                <YAxis tickFormatter={(val) => `$${val/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F6F1E8'}} />
                <Legend wrapperStyle={{ fontSize: '12px', fontWeight: 600, paddingTop: '10px' }} />
                <Bar dataKey="Income" name={t('Income', 'Money In')} fill="#E5E0D8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="COGS" name={t('COGS', 'Cost to Make')} fill="#8BAF9F" radius={[4, 4, 0, 0]} />
                <Bar dataKey="OpEx" name={t('OpEx', 'Running Costs')} fill="#C4D6CE" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Profit" name={t('Profit', 'Bottom Line')} fill={theme.primary} radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.Profit < 0 ? theme.red : theme.primary} />
                  ))}
                </Bar>
                <ReferenceLine y={0} stroke="#111111" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- MAIN APP ---

export default function App() {
  const [activeTabId, setActiveTabId] = useState('executive');
  const [view, setView] = useState('Normalized'); 
  const [roleView, setRoleView] = useState('CFO'); 
  const [mathMode, setMathMode] = useState(false); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState(null);

  const t = (cfoTerm, ownerTerm) => roleView === 'Owner' ? ownerTerm : cfoTerm;

  const handleMetricSelect = (data) => {
    if(!data) return;
    setSelectedMetric(data);
    setDrawerOpen(true);
  };

  const tabsConfig = [
    { id: 'executive', cfoName: 'Executive Overview', ownerName: 'Big Picture' },
    { id: 'revenue', cfoName: 'Revenue & Mix', ownerName: 'Sales & Products' },
    { id: 'margins', cfoName: 'Department Margins', ownerName: 'Profit by Department' },
    { id: 'discounts', cfoName: 'Discounts', ownerName: 'Money Given Away' },
    { id: 'cogs', cfoName: 'COGS Drivers', ownerName: 'Cost to Make Things' },
    { id: 'opex', cfoName: 'Operating Expenses', ownerName: 'Running Costs' },
    { id: 'cash', cfoName: 'Cash & Liquidity Profile', ownerName: 'Bank Balance & Bills' },
    { id: 'alerts', cfoName: 'Board Pack & Alerts', ownerName: 'Alerts & Actions' },
    { id: 'scenario', cfoName: 'Scenario Planner', ownerName: 'What-If Machine' }
  ];

  const getActiveTabName = () => {
    const tab = tabsConfig.find(tConfig => tConfig.id === activeTabId);
    return t(tab.cfoName, tab.ownerName);
  };

  const renderActiveTab = () => {
    const props = { view, t, mathMode, onSelectMetric: handleMetricSelect };
    switch (activeTabId) {
      case 'executive': return <TabExecutive {...props} />;
      case 'revenue': return <TabRevenue {...props} />;
      case 'margins': return <TabMargins {...props} />;
      case 'discounts': return <TabDiscounts {...props} />;
      case 'cogs': return <TabCOGS {...props} />;
      case 'opex': return <TabOpEx {...props} />;
      case 'cash': return <TabCash {...props} />;
      case 'alerts': return <TabAlerts {...props} />;
      case 'scenario': return <TabScenarioPlanner {...props} />;
      default: return <TabExecutive {...props} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F6F1E8] text-[#111111] font-sans overflow-hidden selection:bg-[#638C80] selection:text-white">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#111111]/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <SlideOutDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        content={selectedMetric}
        roleView={roleView}
      />

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#FFFFFF] border-r border-[#E5E0D8] shadow-sm transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className="px-6 py-8 border-b border-[#E5E0D8] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center">
             <div className="w-12 h-12 bg-[#638C80] rounded-2xl flex items-center justify-center mr-4 shadow-md">
              <Activity className="text-white" size={26} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-none text-[#111111]">Roshed</h1>
              <p className="text-[10px] text-[#638C80] uppercase tracking-widest font-extrabold mt-1">Fractional CFO</p>
            </div>
          </div>
          <button className="lg:hidden text-gray-400 hover:text-[#111111] p-2 bg-[#F6F1E8] rounded-full" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-1 hide-scrollbar">
          <div className="text-[10px] font-extrabold text-[#638C80] uppercase tracking-widest mb-4 px-3">{t('Strategic Views', 'Dashboard Sections')}</div>
          {tabsConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTabId(tab.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center group ${
                activeTabId === tab.id
                  ? 'bg-[#638C80] text-white shadow-md'
                  : 'text-gray-500 hover:bg-[#F6F1E8] hover:text-[#111111]'
              }`}
            >
              <LayoutDashboard size={18} className={`mr-4 ${activeTabId === tab.id ? 'text-white' : 'text-gray-400 group-hover:text-[#638C80] transition-colors'}`} />
              {t(tab.cfoName, tab.ownerName)}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-[#E5E0D8] bg-[#FFFFFF]">
          <div className="flex items-center space-x-3 text-xs text-[#111111] font-bold bg-[#F6F1E8] px-4 py-3 rounded-xl border border-[#E5E0D8]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#638C80] animate-pulse"></span>
            <span className="tracking-wide uppercase">Live Sync Active</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E0D8] px-8 py-5 flex items-center justify-between z-10 shrink-0 sticky top-0">
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-[#111111] p-2 bg-[#F6F1E8] rounded-lg border border-[#E5E0D8]" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-xl font-extrabold text-[#111111] hidden sm:block tracking-tight">{getActiveTabName()}</h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <button
              onClick={() => setMathMode(!mathMode)}
              className={`hidden md:flex items-center px-4 py-2 rounded-full border transition-all text-xs font-bold uppercase tracking-wider ${
                mathMode 
                  ? 'bg-[#F6F1E8] border-[#638C80] text-[#638C80]' 
                  : 'bg-white border-[#E5E0D8] text-gray-500 hover:text-[#111111]'
              }`}
            >
              <Calculator size={14} className="mr-2"/>
              Math Mode: {mathMode ? 'ON' : 'OFF'}
            </button>

            <div className="flex items-center bg-[#F6F1E8] p-1 rounded-full border border-[#E5E0D8]">
              {['Reported', 'Normalized'].map(v => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 rounded-full transition-all flex items-center text-xs font-bold tracking-wide ${
                    view === v 
                      ? 'bg-[#FFFFFF] text-[#111111] shadow-sm border border-[#E5E0D8]' 
                      : 'text-gray-500 hover:text-[#111111]'
                  }`}
                >
                  {v === 'Normalized' && view === v && <CheckCircle size={14} className="mr-1.5 opacity-100 text-[#638C80]" />}
                  {t(v, v === 'Reported' ? 'On Paper' : 'True Performance')}
                </button>
              ))}
            </div>

            <div className="flex items-center bg-[#F6F1E8] p-1 rounded-full border border-[#E5E0D8] shadow-inner">
              {['CFO', 'Owner'].map(role => (
                <button
                  key={role}
                  onClick={() => setRoleView(role)}
                  className={`px-4 py-1.5 rounded-full transition-all flex items-center text-xs sm:text-sm font-bold tracking-wide ${
                    roleView === role 
                      ? 'bg-[#FFFFFF] text-[#638C80] shadow-sm border border-[#E5E0D8]' 
                      : 'text-gray-500 hover:text-[#111111]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
            
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 hide-scrollbar bg-[#F6F1E8]">
          <div className="max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}
